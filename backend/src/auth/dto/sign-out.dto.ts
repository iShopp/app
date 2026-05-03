import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignOutDto {
  @ApiProperty({ example: 'refresh_token_here' })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
