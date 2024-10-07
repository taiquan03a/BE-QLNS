import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "../../category.entity";

@Entity('ethnicities')
export class Ethnicity extends CategoryEntity {
}
