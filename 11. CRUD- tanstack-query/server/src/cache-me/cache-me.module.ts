import { Module } from '@nestjs/common';
import { CacheMeService } from './cache-me.service';
import { CacheMeController } from './cache-me.controller';

@Module({
  controllers: [CacheMeController],
  providers: [CacheMeService],
})
export class CacheMeModule {}
