import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
import { IsNull } from "typeorm";

export class CreateUserDto {
    //avatar: Express.Multer.File;
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
