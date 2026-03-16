import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SuggestionStatus, SuggestionType } from '@prisma/client';

export class UpdateSuggestionDto {
  @ApiPropertyOptional({ enum: SuggestionStatus })
  @IsOptional()
  @IsEnum(SuggestionStatus)
  status?: SuggestionStatus;
}

export class SuggestionFilterDto {
  @ApiPropertyOptional({ enum: SuggestionType })
  @IsOptional()
  @IsEnum(SuggestionType)
  type?: SuggestionType;

  @ApiPropertyOptional({ enum: SuggestionStatus })
  @IsOptional()
  @IsEnum(SuggestionStatus)
  status?: SuggestionStatus;
}
