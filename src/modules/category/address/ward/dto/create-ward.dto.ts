import { IsNotEmpty } from "class-validator"
import { CategoryDto } from "src/modules/category/category.dto"

export class CreateWardDto extends CategoryDto {
    @IsNotEmpty()
    id: number
}
