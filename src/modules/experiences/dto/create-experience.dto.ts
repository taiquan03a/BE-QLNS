import { IsNotEmpty } from "class-validator";

export class CreateExperienceDto {
    @IsNotEmpty()
    begin_time: Date;
    @IsNotEmpty()
    end_time: Date;
    @IsNotEmpty()
    company: string;
    @IsNotEmpty()
    position: string;
    @IsNotEmpty()
    profileId: number;
}
