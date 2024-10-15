import { Entity, OneToMany } from "typeorm";
import { CategoryEntity } from "../../category.entity";
import { Education } from "src/modules/education/entities/education.entity";

@Entity('majors')
export class Major extends CategoryEntity {
    @OneToMany(() => Education, (educations) => educations.major)
    educations: Education[];
}
