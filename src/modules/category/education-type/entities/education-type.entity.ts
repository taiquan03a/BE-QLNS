import { Entity, OneToMany } from "typeorm";
import { CategoryDto } from "../../category.dto";
import { CategoryEntity } from "../../category.entity";
import { Education } from "src/modules/education/entities/education.entity";

@Entity('education_type')
export class EducationType extends CategoryEntity {
    @OneToMany(() => Education, (educations) => educations.educationType)
    educations: Education[];
}
