import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

class AddWishlistItemDto {
  @ApiProperty({ example: 'prod_abc123' })
  @IsString()
  @IsNotEmpty()
  productId: string;
}

@ApiTags('Wishlist')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user wishlist' })
  getWishlist(@Request() req: any) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to wishlist' })
  addItem(@Request() req: any, @Body() dto: AddWishlistItemDto) {
    return this.wishlistService.addItem(req.user.id, dto.productId);
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remove item from wishlist' })
  removeItem(@Request() req: any, @Param('productId') productId: string) {
    return this.wishlistService.removeItem(req.user.id, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear wishlist' })
  clearWishlist(@Request() req: any) {
    return this.wishlistService.clearWishlist(req.user.id);
  }

  @Get('check/:productId')
  @ApiOperation({ summary: 'Check if product is in wishlist' })
  async isWishlisted(@Request() req: any, @Param('productId') productId: string) {
    const wishlisted = await this.wishlistService.isWishlisted(req.user.id, productId);
    return { wishlisted };
  }
}
