import { Entity } from "typeorm";
import { CategoryEntity } from "../../category.entity";

@Entity('majors')
export class Major extends CategoryEntity {

}
