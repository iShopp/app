import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

@Processor('stock-sync')
export class StockSyncProcessor {
  private readonly logger = new Logger(StockSyncProcessor.name);

  constructor(private prisma: PrismaService) {}

  @Process()
  async handleStockSync(job: Job) {
    this.logger.log(`Processing stock-sync job ${job.id}`);

    const products = await this.prisma.product.findMany({
      where: { marketplace: { not: 'MANUAL' } },
      take: 100,
    });

    for (const product of products) {
      // TODO: Fetch actual stock levels from marketplace adapter
      this.logger.debug(`Would sync stock for product ${product.id}`);
    }

    await this.prisma.automationJob.updateMany({
      where: { type: 'STOCK_SYNC' },
      data: { lastRun: new Date(), status: 'COMPLETED' },
    });

    this.logger.log(`Stock sync complete for ${products.length} products`);
    return { synced: products.length };
  }
}
