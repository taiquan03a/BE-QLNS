import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "../../category.entity";
import { Education } from "src/modules/education/entities/education.entity";


@Entity('degrees')
export class Degree extends CategoryEntity {
    @OneToMany(() => Education, (educations) => educations.degree)
    educations: Education[];
}   
