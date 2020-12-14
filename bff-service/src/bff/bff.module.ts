import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';

@Module({
  controllers: [BffController]
})
export class BffModule {}
