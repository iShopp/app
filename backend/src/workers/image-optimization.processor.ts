import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

@Processor('image-optimization')
export class ImageOptimizationProcessor {
  private readonly logger = new Logger(ImageOptimizationProcessor.name);

  constructor(private prisma: PrismaService) {}

  @Process()
  async handleImageOptimization(job: Job<{ productId?: string }>) {
    this.logger.log(`Processing image optimization job ${job.id}`);

    const where = job.data?.productId ? { id: job.data.productId } : {};
    const products = await this.prisma.product.findMany({
      where,
      select: { id: true, images: true },
      take: 50,
    });

    for (const product of products) {
      // TODO: Download and re-encode images via sharp or external CDN
      this.logger.debug(
        `Would optimize ${product.images.length} images for product ${product.id}`,
      );
    }

    await this.prisma.automationJob.updateMany({
      where: { type: 'IMAGE_OPTIMIZATION' },
      data: { lastRun: new Date(), status: 'COMPLETED' },
    });

    return { optimized: products.length };
  }
}
