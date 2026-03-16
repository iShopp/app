import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AffiliatesService } from './affiliates.service';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Affiliates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('affiliates')
export class AffiliatesController {
  constructor(private affiliatesService: AffiliatesService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'List all affiliates (admin)' })
  findAll(@Query() pagination: PaginationDto) {
    return this.affiliatesService.findAll(pagination);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get own affiliate account' })
  getMyAffiliate(@Request() req: any) {
    return this.affiliatesService.findByUserId(req.user.id);
  }

  @Post('apply')
  @ApiOperation({ summary: 'Apply for affiliate program' })
  applyForAffiliate(@Request() req: any) {
    return this.affiliatesService.createForUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get affiliate by ID' })
  findOne(@Param('id') id: string) {
    return this.affiliatesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update affiliate (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateAffiliateDto) {
    return this.affiliatesService.update(id, dto);
  }
}
