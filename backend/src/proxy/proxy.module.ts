import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { TemuAdapter } from './adapters/temu.adapter';
import { AliexpressAdapter } from './adapters/aliexpress.adapter';
import { AmazonAdapter } from './adapters/amazon.adapter';
import { EbayAdapter } from './adapters/ebay.adapter';
import { LazadaAdapter } from './adapters/lazada.adapter';

@Module({
  controllers: [ProxyController],
  providers: [
    ProxyService,
    TemuAdapter,
    AliexpressAdapter,
    AmazonAdapter,
    EbayAdapter,
    LazadaAdapter,
  ],
  exports: [ProxyService],
})
export class ProxyModule {}
