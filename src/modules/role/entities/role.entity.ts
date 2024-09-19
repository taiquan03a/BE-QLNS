import { permission } from 'process';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('role')
export class Role {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 50, unique: true })
    code: string;

    @Column({ length: 50 })
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    update_at: Date;

    @Column({ length: 50 })
    create_by: string;

    @Column({ length: 50, nullable: true })
    update_by: string;

    @ManyToMany(() => User, user => user.roles,)
    users?: User[];

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: 'permission_role',
        joinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "permission_id",
            referencedColumnName: "id"
        }
    })
    permissions?: Permission[];
}
