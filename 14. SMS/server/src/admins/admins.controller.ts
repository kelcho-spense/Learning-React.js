import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AtGuard } from '../auth/guards/at.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../profiles/entities/profile.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AtGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  findAllUsers() {
    return this.adminsService.findAllUsers();
  }

  @Get('admins')
  @Roles(Role.SUPER_ADMIN) // Only super admin can view admins
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'Return all admins' })
  findAllAdmins() {
    return this.adminsService.findAllAdmins();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return user details' })
  findUser(@Param('id') id: string) {
    return this.adminsService.findUserById(+id);
  }

  @Patch('users/:id/activate')
  @ApiOperation({ summary: 'Activate user' })
  @ApiResponse({ status: 200, description: 'User activated' })
  activateUser(@Param('id') id: string) {
    return this.adminsService.activateUser(+id);
  }

  @Patch('users/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiResponse({ status: 200, description: 'User deactivated' })
  deactivateUser(@Param('id') id: string) {
    return this.adminsService.deactivateUser(+id);
  }

  @Patch('users/:id/reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
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
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiResponse({ status: 200, description: 'Return user statistics' })
  getUserStats() {
    return this.adminsService.getUserStats();
  }

  @Patch('admins/:id/activate')
  @Roles(Role.SUPER_ADMIN) // Only super admin can activate/deactivate admins
  @ApiOperation({ summary: 'Activate admin' })
  @ApiResponse({ status: 200, description: 'Admin activated' })
  activateAdmin(@Param('id') id: string) {
    return this.adminsService.activateAdmin(+id);
  }

  @Patch('admins/:id/deactivate')
  @Roles(Role.SUPER_ADMIN) // Only super admin can activate/deactivate admins
  @ApiOperation({ summary: 'Deactivate admin' })
  @ApiResponse({ status: 200, description: 'Admin deactivated' })
  deactivateAdmin(@Param('id') id: string) {
    return this.adminsService.deactivateAdmin(+id);
  }
}
