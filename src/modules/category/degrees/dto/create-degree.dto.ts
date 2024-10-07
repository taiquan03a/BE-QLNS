import { IsNotEmpty } from "class-validator";

export class CreateDegreeDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}
