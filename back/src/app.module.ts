import { Module } from '@nestjs/common';
import { AdvertsModule } from './modules/adverts/adverts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { GalleryModule } from './modules/gallery/gallery.module';

@Module({
  imports: [AdvertsModule, UsersModule, AuthModule, AddressesModule, GalleryModule],
})
export class AppModule {}
