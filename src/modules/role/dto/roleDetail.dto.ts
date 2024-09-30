import { IsNotEmpty } from "class-validator";
import { Permission } from "src/modules/permission/entities/permission.entity";

export class RoleDetail {
    id: number;
    name: string;
    code: string;
    permissions: Permission[];
}
