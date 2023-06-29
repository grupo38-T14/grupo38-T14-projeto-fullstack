import { Controller, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Addresses")
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() data: UpdateAddressDto, @CurrentUser() user: User) {
    return this.addressesService.update(id, data, user.id);
  }
}
