import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { OrdersModule } from './orders/orders.module';
import { AffiliatesModule } from './affiliates/affiliates.module';
import { CouponsModule } from './coupons/coupons.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { BannersModule } from './banners/banners.module';
import { PricingModule } from './pricing/pricing.module';
import { WorkersModule } from './workers/workers.module';
import { ProxyModule } from './proxy/proxy.module';
import { AiModule } from './ai/ai.module';
import { BuilderModule } from './builder/builder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    OrdersModule,
    AffiliatesModule,
    CouponsModule,
    AnalyticsModule,
    BannersModule,
    PricingModule,
    WorkersModule,
    ProxyModule,
    AiModule,
    BuilderModule,
  ],
})
export class AppModule {}
