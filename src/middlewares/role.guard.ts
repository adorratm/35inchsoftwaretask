import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<number>('role', context.getHandler());
    if (!requiredRole) {
      return true; // If there's no role required, allow access
    }
    
    const { user } = context.switchToHttp().getRequest();
    if (!user || user.role !== requiredRole) {
      return false; // If user is not authenticated or doesn't have required role, deny access
    }

    return true;
  }
}