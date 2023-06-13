import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertsModule } from './modules/adverts/adverts.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AdvertsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
