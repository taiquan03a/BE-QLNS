import { IsEmail, IsNotEmpty } from "class-validator";

export class ConfirmPassword {
    @IsNotEmpty()
    token: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    confirmPassword: string;
}