import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PERMISSIONS_KEY } from "src/decorator/customize";
import { Permission } from "src/modules/permission/entities/permission.entity";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UsersService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.user);
        if (!request.user.id) throw new UnauthorizedException("UseID not found");
        const requiredPermissions: Permission[] = this.reflector.getAllAndOverride(
            PERMISSIONS_KEY,
            [context.getHandler(), context.getClass()],
        );
        console.log(` the route permissions are ${requiredPermissions}`);

        if (!requiredPermissions) {
            return true;
        }

        try {
            const { user } = context.switchToHttp().getRequest();
            const userPermissions = await this.userService.findPermissionByUser(user.id);
            return requiredPermissions.every((permission) =>
                userPermissions.includes(permission),
            );
        } catch (e) {
            throw new ForbiddenException();
        }
    }

}