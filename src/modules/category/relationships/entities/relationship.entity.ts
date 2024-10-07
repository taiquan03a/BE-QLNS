import { Entity } from "typeorm";
import { CategoryEntity } from "../../category.entity";

@Entity('relationships')
export class Relationship extends CategoryEntity { }
