import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshToken: {
      create: jest.fn().mockResolvedValue({ id: 'rt-1', token: 'refresh-token' }),
      delete: jest.fn().mockResolvedValue({}),
      deleteMany: jest.fn().mockResolvedValue({}),
      findUnique: jest.fn(),
    },
  };

  const mockJwt = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  const mockConfig = {
    get: jest.fn((key: string) => {
      const values: Record<string, string> = {
        JWT_REFRESH_SECRET: 'test-refresh-secret',
        JWT_REFRESH_EXPIRES_IN: '30d',
        FRONTEND_URL: 'http://localhost:3000',
      };
      return values[key] ?? undefined;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
        { provide: ConfigService, useValue: mockConfig },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
    // Re-apply default mock for refreshToken.create after clearAllMocks
    mockPrisma.refreshToken.create.mockResolvedValue({ id: 'rt-1', token: 'refresh-token' });
  });

  describe('validateUser', () => {
    it('returns null when user is not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await service.validateUser('x@test.com', 'pass');
      expect(result).toBeNull();
    });

    it('returns null when password does not match', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'x@test.com',
        password: await bcrypt.hash('correct', 10),
        role: 'USER',
      });
      const result = await service.validateUser('x@test.com', 'wrong');
      expect(result).toBeNull();
    });

    it('returns user without password when credentials are valid', async () => {
      const hash = await bcrypt.hash('secret', 10);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'x@test.com',
        password: hash,
        role: 'USER',
      });
      const result = await service.validateUser('x@test.com', 'secret');
      expect(result).not.toBeNull();
      expect(result!.email).toBe('x@test.com');
      expect((result as Record<string, unknown>).password).toBeUndefined();
    });
  });

  describe('signIn', () => {
    it('throws UnauthorizedException for invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.signIn('bad@test.com', 'pass')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('returns access_token and user on success', async () => {
      const hash = await bcrypt.hash('pass', 10);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'ok@test.com',
        password: hash,
        role: 'USER',
      });
      const result = await service.signIn('ok@test.com', 'pass');
      expect(result.access_token).toBe('test-token');
      expect(result.user.email).toBe('ok@test.com');
    });
  });

  describe('signUp', () => {
    it('throws ConflictException if email already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: '1' });
      await expect(
        service.signUp({ name: 'A', email: 'exists@test.com', password: 'p' }),
      ).rejects.toThrow(ConflictException);
    });

    it('creates user and returns access_token on success', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: '2',
        name: 'Bob',
        email: 'new@test.com',
        role: 'USER',
        password: 'hashed',
      });
      const result = await service.signUp({
        name: 'Bob',
        email: 'new@test.com',
        password: 'secure123',
      });
      expect(result.access_token).toBe('test-token');
      expect(result.user.email).toBe('new@test.com');
      expect((result.user as Record<string, unknown>).password).toBeUndefined();
    });
  });
});
