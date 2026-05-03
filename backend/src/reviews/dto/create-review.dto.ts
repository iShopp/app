import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 'Great product!' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Really satisfied with this purchase.' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: 'prod_abc123' })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
