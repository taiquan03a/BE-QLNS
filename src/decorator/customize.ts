import { SetMetadata } from "@nestjs/common"
import { Permission } from "src/modules/permission/entities/permission.entity";
import { Role } from "src/modules/role/entities/role.entity";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RESPONSE_MESSAGE = "response_message";
export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE, message);

export const PERMISSIONS_KEY = "permissions";
export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
