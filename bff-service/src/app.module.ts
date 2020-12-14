import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BffModule } from './bff/bff.module';

@Module({
  imports: [BffModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
