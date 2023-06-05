import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertsModule } from './modules/adverts/adverts.module';

@Module({
  imports: [AdvertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
