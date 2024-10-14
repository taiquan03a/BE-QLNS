import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    cccd: string;
    @IsNotEmpty()
    first_name: string;
    @IsNotEmpty()
    last_name: string;
    @IsNotEmpty()
    sex: number;
    @IsNotEmpty()
    date_of_birth: Date;
    @IsNotEmpty()
    phone_number: string;
    @IsNotEmpty()
    education_level: number;
    @IsNotEmpty()
    hometown_detail: string;
    @IsNotEmpty()
    hometown_ward_id: number;
    @IsNotEmpty()
    permanent_address_detail: string;
    @IsNotEmpty()
    permanent_address_ward_id: number;
    @IsNotEmpty()
    address_now_detail: string;
    @IsNotEmpty()
    address_now_ward_id: number;
    @IsNotEmpty()
    ethnicityId: number
}
