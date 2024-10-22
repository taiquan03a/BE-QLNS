import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "../../category.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { ProfileRequest } from "src/request/profile-request/entities/profile-request.entity";

@Entity('ethnicities')
export class Ethnicity extends CategoryEntity {
    @OneToMany(() => Profile, (profile) => profile.ethnicity)
    profile: Profile[];

    // @OneToMany(() => ProfileRequest, (profileRequest) => profileRequest.ethnicity)
    // profileRequest: ProfileRequest[];
}
