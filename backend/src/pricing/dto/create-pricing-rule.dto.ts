import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Marketplace, PricingRuleAppliesTo, PricingRuleType } from '@prisma/client';

export class CreatePricingRuleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ enum: Marketplace })
  @IsOptional()
  @IsEnum(Marketplace)
  marketplace?: Marketplace;

  @ApiProperty({ enum: PricingRuleType })
  @IsEnum(PricingRuleType)
  type: PricingRuleType;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty({ enum: PricingRuleAppliesTo })
  @IsEnum(PricingRuleAppliesTo)
  appliesTo: PricingRuleAppliesTo;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
