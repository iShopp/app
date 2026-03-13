import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AutomationService, JobType } from './automation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Automation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('automation')
export class AutomationController {
  constructor(private automationService: AutomationService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get queue stats (admin)' })
  getStats() {
    return this.automationService.getQueueStats();
  }

  @Post('jobs/:type/trigger')
  @ApiOperation({ summary: 'Trigger an automation job (admin)' })
  triggerJob(@Param('type') type: JobType, @Body() data: Record<string, any>) {
    return this.automationService.triggerJob(type, data);
  }
}
