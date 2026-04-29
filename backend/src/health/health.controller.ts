import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint for container orchestration' })
  check(@Res() res: Response) {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  }
}
