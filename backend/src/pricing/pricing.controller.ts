import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { CreatePricingRuleDto } from './dto/create-pricing-rule.dto';
import { UpdatePricingRuleDto } from './dto/update-pricing-rule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Pricing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get('rules')
  @ApiOperation({ summary: 'List all pricing rules (admin)' })
  findAll() {
    return this.pricingService.findAll();
  }

  @Get('rules/:id')
  findOne(@Param('id') id: string) {
    return this.pricingService.findOne(id);
  }

  @Post('rules')
  @ApiOperation({ summary: 'Create pricing rule (admin)' })
  create(@Body() dto: CreatePricingRuleDto) {
    return this.pricingService.create(dto);
  }

  @Patch('rules/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePricingRuleDto) {
    return this.pricingService.update(id, dto);
  }

  @Delete('rules/:id')
  remove(@Param('id') id: string) {
    return this.pricingService.remove(id);
  }
}
