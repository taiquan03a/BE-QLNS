import { IsNotEmpty } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}