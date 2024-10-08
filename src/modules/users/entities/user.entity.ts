import { Profile } from "src/modules/profile/entities/profile.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    code: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255, name: 'first_name' })
    firstName: string;

    @Column({ type: 'varchar', length: 255, name: 'last_name' })
    lastName: string;

    @Column({ type: 'date', nullable: true, name: 'date_of_birth' })
    dateOfBirth: Date;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: true, name: 'phone_number' })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 50, name: 'user_type' })
    userType: string;

    @Column({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        name: 'update_at'
    })
    updateAt: Date;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        name: 'create_by'
    })
    createBy: string;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'update_by' })
    updateBy: string;

    @Column({ type: 'bit', default: 1 })
    status: number;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        }
    })
    roles?: Role[];
    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;
}
