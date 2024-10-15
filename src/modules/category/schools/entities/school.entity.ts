import { Entity, OneToMany } from "typeorm";
import { CategoryEntity } from "../../category.entity";
import { Education } from "src/modules/education/entities/education.entity";

@Entity('schools')
export class School extends CategoryEntity {
    @OneToMany(() => Education, (educations) => educations.school)
    educations: Education[];
}
