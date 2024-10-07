import { CategoryEntity } from "src/modules/category/category.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { District } from "../../district/entities/district.entity";

@Entity('wards')
export class Ward extends CategoryEntity {
    @ManyToOne(() => District, district => district.wards)
    @JoinColumn({ name: 'district_id' })
    district: District;
}
