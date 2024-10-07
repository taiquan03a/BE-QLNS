import { IsNotEmpty } from "class-validator";

export class CreateEthnicityDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}
