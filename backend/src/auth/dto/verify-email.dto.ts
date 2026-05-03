import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ example: 'verification-token-here' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
