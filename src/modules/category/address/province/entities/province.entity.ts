import { CategoryEntity } from "src/modules/category/category.entity";
import { Entity, OneToMany } from "typeorm";
import { District } from "../../district/entities/district.entity";

@Entity('provinces')
export class Province extends CategoryEntity {
    @OneToMany(() => District, (districts) => districts.province)
    districts: District[];
}
