import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "../../category.entity";


@Entity('degrees')
export class Degree extends CategoryEntity {

}
