import { CategoryEntity } from "src/modules/category/category.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Province } from "../../province/entities/province.entity";
import { Ward } from "../../ward/entities/ward.entity";

@Entity('districts')
export class District extends CategoryEntity {
    @ManyToOne(() => Province, province => province.districts)
    @JoinColumn({ name: 'province_id' })
    province: Province;

    @OneToMany(() => Ward, (wards) => wards.district)
    wards: Ward[];
}
