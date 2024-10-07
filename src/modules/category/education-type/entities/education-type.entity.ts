import { Entity } from "typeorm";
import { CategoryDto } from "../../category.dto";
import { CategoryEntity } from "../../category.entity";

@Entity('education_type')
export class EducationType extends CategoryEntity { }
