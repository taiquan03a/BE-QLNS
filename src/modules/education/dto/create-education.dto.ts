import { IsNotEmpty } from "class-validator";

export class CreateEducationDto {
    @IsNotEmpty()
    profileId: number;
    @IsNotEmpty()
    beginTime: Date;
    @IsNotEmpty()
    endTime: Date;
    @IsNotEmpty()
    schoolId: number;
    @IsNotEmpty()
    majorId: number;
    @IsNotEmpty()
    degreeId: number;
    @IsNotEmpty()
    educationTypeId: number;
}
