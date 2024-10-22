import { Ethnicity } from "src/modules/category/ethnicities/entities/ethnicity.entity";
import { Education } from "src/modules/education/entities/education.entity";
import { Experience } from "src/modules/experiences/entities/experience.entity";
import { Family } from "src/modules/families/entities/family.entity";
import { User } from "src/modules/users/entities/user.entity";
import { StatusRequest } from "src/request/status-request/entities/status-request.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class ProfileRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    code: string;

    @Column({ length: 255, nullable: true })
    avatar: string;

    @Column({ length: 20, unique: true })
    cccd: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ length: 255 })
    first_name: string;

    @Column({ length: 255 })
    last_name: string;

    @Column()
    sex: number;

    @Column('date')
    date_of_birth: Date;

    @Column({ length: 20, unique: true })
    phone_number: string;

    @Column()
    education_level: number;

    @Column({ length: 255, nullable: true })
    award: string;

    @Column({ length: 50, nullable: true })
    hometown_detail: string;

    @Column()
    hometown_ward_id: number;

    @Column({ length: 50, nullable: true })
    permanent_address_detail: string;

    @Column()
    permanent_address_ward_id: number;

    @Column({ length: 50, nullable: true })
    address_now_detail: string;

    @Column()
    address_now_ward_id: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ length: 50, nullable: true })
    create_by: string;

    @Column({ length: 50, nullable: true })
    update_by: string;

    // @ManyToOne(() => Ethnicity, ethnicity => ethnicity.profileRequest)
    // @JoinColumn({ name: 'ethnicity_id' })
    // ethnicity: Ethnicity;

    // @ManyToOne(() => User, (user) => user.profileRequest)
    // @JoinColumn({ name: 'user_id' })
    // user: User;


    // @ManyToOne(() => StatusRequest, (statusRequest) => statusRequest.profileRequest)
    // @JoinColumn({ name: 'status_id' }) // Sử dụng 'status_id' làm khóa ngoại
    // statusRequest: StatusRequest;
}