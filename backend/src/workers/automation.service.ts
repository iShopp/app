import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export type JobType =
  | 'price-sync'
  | 'stock-sync'
  | 'order-fulfillment'
  | 'product-import'
  | 'image-optimization';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(
    @InjectQueue('price-sync') private priceSyncQueue: Queue,
    @InjectQueue('stock-sync') private stockSyncQueue: Queue,
    @InjectQueue('order-fulfillment') private orderFulfillmentQueue: Queue,
    @InjectQueue('product-import') private productImportQueue: Queue,
    @InjectQueue('image-optimization') private imageOptimizationQueue: Queue,
  ) {}

  async triggerJob(type: JobType, data?: Record<string, any>) {
    this.logger.log(`Triggering job: ${type}`);

    const queueMap: Record<JobType, Queue> = {
      'price-sync': this.priceSyncQueue,
      'stock-sync': this.stockSyncQueue,
      'order-fulfillment': this.orderFulfillmentQueue,
      'product-import': this.productImportQueue,
      'image-optimization': this.imageOptimizationQueue,
    };

    const queue = queueMap[type];
    if (!queue) throw new BadRequestException(`Unknown job type: ${type}`);

    const job = await queue.add(data ?? {});
    return { jobId: job.id, type, status: 'queued' };
  }

  async getQueueStats() {
    const queues = [
      { name: 'price-sync', queue: this.priceSyncQueue },
      { name: 'stock-sync', queue: this.stockSyncQueue },
      { name: 'order-fulfillment', queue: this.orderFulfillmentQueue },
      { name: 'product-import', queue: this.productImportQueue },
      { name: 'image-optimization', queue: this.imageOptimizationQueue },
    ];

    const stats = await Promise.all(
      queues.map(async ({ name, queue }) => ({
        name,
        waiting: await queue.getWaitingCount(),
        active: await queue.getActiveCount(),
        completed: await queue.getCompletedCount(),
        failed: await queue.getFailedCount(),
      })),
    );

    return stats;
  }
}
