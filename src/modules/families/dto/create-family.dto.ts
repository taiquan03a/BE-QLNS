import { IsNotEmpty } from "class-validator";

export class CreateFamilyDto {
    @IsNotEmpty()
    relationshipId: number;
    @IsNotEmpty()
    year_of_birth: number;
    @IsNotEmpty()
    full_name: string;
    @IsNotEmpty()
    job: string;
    @IsNotEmpty()
    address_detail: string;
    @IsNotEmpty()
    ward_id: number;
    @IsNotEmpty()
    profile_id: number;
}
