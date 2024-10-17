import { Entity, OneToMany } from "typeorm";
import { CategoryEntity } from "../../category.entity";
import { Family } from "src/modules/families/entities/family.entity";

@Entity('relationships')
export class Relationship extends CategoryEntity {
    @OneToMany(() => Family, (families) => families.relationship)
    families: Family[];
}
