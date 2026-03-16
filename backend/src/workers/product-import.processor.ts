import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

@Processor('product-import')
export class ProductImportProcessor {
  private readonly logger = new Logger(ProductImportProcessor.name);

  constructor(private prisma: PrismaService) {}

  @Process()
  async handleProductImport(job: Job<{ marketplace: string; query?: string }>) {
    this.logger.log(`Processing product import from ${job.data?.marketplace}`);

    // TODO: Search marketplace adapter for products matching job.data.query
    // and import them into the database with pricing rules applied
    this.logger.debug(
      `Would import products from ${job.data?.marketplace} matching "${job.data?.query}"`,
    );

    await this.prisma.automationJob.updateMany({
      where: { type: 'PRODUCT_IMPORT' },
      data: { lastRun: new Date(), status: 'COMPLETED' },
    });

    return { imported: 0 };
  }
}
