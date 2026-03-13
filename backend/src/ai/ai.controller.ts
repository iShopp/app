import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import {
  GenerateDescriptionDto,
  GenerateFAQsDto,
  GenerateSEODto,
} from './dto/ai-generate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('AI Content Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate/description')
  @ApiOperation({ summary: 'Generate AI product description (admin)' })
  generateDescription(@Body() dto: GenerateDescriptionDto) {
    return this.aiService.generateProductDescription(
      dto.name,
      dto.category,
      dto.features,
    );
  }

  @Post('generate/seo')
  @ApiOperation({ summary: 'Generate SEO tags for a product (admin)' })
  generateSEO(@Body() dto: GenerateSEODto) {
    return this.aiService.generateSEOTags({
      productName: dto.productName,
      category: dto.category,
      description: dto.description,
    });
  }

  @Post('generate/faqs')
  @ApiOperation({ summary: 'Generate product FAQs (admin)' })
  generateFAQs(@Body() dto: GenerateFAQsDto) {
    return this.aiService.generateProductFAQs(
      { productName: dto.productName, description: dto.description },
      dto.count,
    );
  }
}
