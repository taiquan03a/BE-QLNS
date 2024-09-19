import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({ message: "not empty" })
    code: string;
    @IsNotEmpty({ message: "not empty" })
    name: string;
    @IsNotEmpty({ message: "not empty" })
    permissionId: number[]
}
