import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomationController } from './automation.controller';
import { AutomationService } from './automation.service';
import { PriceSyncProcessor } from './price-sync.processor';
import { StockSyncProcessor } from './stock-sync.processor';
import { OrderFulfillmentProcessor } from './order-fulfillment.processor';
import { ProductImportProcessor } from './product-import.processor';
import { ImageOptimizationProcessor } from './image-optimization.processor';

const QUEUES = [
  'price-sync',
  'stock-sync',
  'order-fulfillment',
  'product-import',
  'image-optimization',
];

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL', 'redis://localhost:6379');
        const url = new URL(redisUrl);
        return {
          redis: {
            host: url.hostname,
            port: parseInt(url.port || '6379', 10),
            password: url.password || undefined,
          },
        };
      },
    }),
    ...QUEUES.map((name) => BullModule.registerQueue({ name })),
  ],
  controllers: [AutomationController],
  providers: [
    AutomationService,
    PriceSyncProcessor,
    StockSyncProcessor,
    OrderFulfillmentProcessor,
    ProductImportProcessor,
    ImageOptimizationProcessor,
  ],
  exports: [AutomationService],
})
export class WorkersModule {}
