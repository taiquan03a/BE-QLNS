import { IsNotEmpty } from "class-validator";

export class CategoryDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}