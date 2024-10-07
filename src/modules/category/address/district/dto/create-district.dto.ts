import { IsNotEmpty } from "class-validator";
import { CategoryDto } from "src/modules/category/category.dto";

export class CreateDistrictDto extends CategoryDto {
    @IsNotEmpty()
    provinceId: number;
}
