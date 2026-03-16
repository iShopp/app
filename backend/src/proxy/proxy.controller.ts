import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProxyService } from './proxy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Proxy / Marketplace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('proxy')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search products on a marketplace' })
  @ApiQuery({ name: 'marketplace', required: true, example: 'aliexpress' })
  @ApiQuery({ name: 'q', required: true, example: 'wireless headphones' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  search(
    @Query('marketplace') marketplace: string,
    @Query('q') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.proxyService.searchProducts(marketplace, query, {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('products/:marketplace/:externalId')
  @ApiOperation({ summary: 'Get a single product from a marketplace' })
  getProduct(
    @Param('marketplace') marketplace: string,
    @Param('externalId') externalId: string,
  ) {
    return this.proxyService.getProduct(marketplace, externalId);
  }
}
