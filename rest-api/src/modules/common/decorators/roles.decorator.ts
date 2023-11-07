import { AuthGuard, RoleGuard } from '@common/guards';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
/**
 * Add roles metadata to the given routes
 * @param roles sets of roles
 * @returns void
 */
export const Auth = (...roles: string[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
    ApiBearerAuth(),
  );
};
