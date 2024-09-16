import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'ko duoc de trong firstName' })
    firstName: string;
    @IsNotEmpty({ message: 'ko duoc de trong lastName' })
    lastName: string;
    @IsEmail({}, { message: "ko duoc de trong email" })
    email: string;
}
