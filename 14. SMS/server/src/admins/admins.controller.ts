import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AtGuard } from '../auth/guards/at.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../profiles/entities/profile.entity';

@Controller('admin')
@UseGuards(AtGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('users')
  findAllUsers() {
    return this.adminsService.findAllUsers();
  }

  @Get('admins')
  findAllAdmins() {
    return this.adminsService.findAllAdmins();
  }

  @Get('users/:id')
  findUser(@Param('id') id: string) {
    return this.adminsService.findUserById(+id);
  }

  @Patch('users/:id/activate')
  activateUser(@Param('id') id: string) {
    return this.adminsService.activateUser(+id);
  }

  @Patch('users/:id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.adminsService.deactivateUser(+id);
  }

  @Patch('users/:id/reset-password')
  resetUserPassword(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.adminsService.resetUserPassword(
      +id,
      resetPasswordDto.newPassword,
    );
  }

  @Get('stats')
  getUserStats() {
    return this.adminsService.getUserStats();
  }
}
