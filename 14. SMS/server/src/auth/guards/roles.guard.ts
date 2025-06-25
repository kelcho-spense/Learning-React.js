import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../profiles/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JWTPayload } from '../strategies/at.strategy';

interface UserRequest extends Request {
  user?: JWTPayload; // Extend Request to include user property
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (!user) {
      return false; // No user in request
    }

    // Fetch the user's profile to get their role
    const userProfile = await this.profileRepository.findOne({
      where: { id: user.sub },
      select: ['id', 'role'],
    });

    if (!userProfile) {
      return false; // User profile not found
    }

    // Check if user's role is in the required roles
    return requiredRoles.some((role) => userProfile.role === role);
  }
}
