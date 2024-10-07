import { Entity } from "typeorm";
import { CategoryEntity } from "../../category.entity";

@Entity('schools')
export class School extends CategoryEntity { }
