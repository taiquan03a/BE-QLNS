import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    avatar: string;
    @IsNotEmpty()
    code: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    dateOfBirth: Date;
    @IsNotEmpty()
    phoneNumber: string;
}
