import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    const { password: _pw, ...result } = user;
    return result;
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await this.prisma.refreshToken.create({
      data: { token, userId, expiresAt },
    });

    return token;
  }

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = await this.generateRefreshToken(user.id);

    return { access_token, refresh_token, user };
  }

  async signUp(dto: SignUpDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        phone: dto.phone,
      },
    });

    const { password: _pw, ...result } = user;
    const payload = { sub: result.id, email: result.email, role: result.role };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = await this.generateRefreshToken(result.id);

    return { access_token, refresh_token, user: result };
  }

  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      if (stored) {
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    const { password: _pw, ...user } = stored.user;
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const new_refresh_token = await this.generateRefreshToken(user.id);

    return { access_token, refresh_token: new_refresh_token, user };
  }

  async signOut(userId: string, refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId, token: refreshToken },
    });
    return { message: 'Signed out successfully' };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Always return success to prevent email enumeration
    if (!user) return { message: 'If that email exists, a reset link has been sent' };

    // Invalidate previous reset tokens
    await this.prisma.passwordReset.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await this.prisma.passwordReset.create({
      data: { token, userId: user.id, expiresAt },
    });

    // In production, send this token via email using a mailer service
    return { message: 'If that email exists, a reset link has been sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const reset = await this.prisma.passwordReset.findUnique({ where: { token } });

    if (!reset || reset.used || reset.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashed = await bcrypt.hash(newPassword, 12);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: reset.userId },
        data: { password: hashed },
      }),
      this.prisma.passwordReset.update({
        where: { id: reset.id },
        data: { used: true },
      }),
      // Invalidate all refresh tokens for security
      this.prisma.refreshToken.deleteMany({ where: { userId: reset.userId } }),
    ]);

    return { message: 'Password reset successfully' };
  }

  async verifyEmail(token: string) {
    const verification = await this.prisma.emailVerification.findUnique({
      where: { token },
    });

    if (!verification || verification.verified || verification.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.emailVerification.update({
      where: { id: verification.id },
      data: { verified: true },
    });

    return { message: 'Email verified successfully' };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
