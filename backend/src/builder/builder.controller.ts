import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuilderService } from './builder.service';
import { SuggestionFilterDto, UpdateSuggestionDto } from './dto/suggestion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Builder / Suggestions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('builder')
export class BuilderController {
  constructor(private builderService: BuilderService) {}

  @Get('suggestions')
  @ApiOperation({ summary: 'Get builder suggestions (admin)' })
  getSuggestions(@Query() filters: SuggestionFilterDto) {
    return this.builderService.getSuggestions(filters);
  }

  @Post('suggestions/generate')
  @ApiOperation({ summary: 'Trigger AI suggestion generation (admin)' })
  generateSuggestions() {
    return this.builderService.generateSuggestions();
  }

  @Patch('suggestions/:id')
  @ApiOperation({ summary: 'Update suggestion status (admin)' })
  updateSuggestion(@Param('id') id: string, @Body() dto: UpdateSuggestionDto) {
    return this.builderService.updateSuggestionStatus(id, dto);
  }
}
