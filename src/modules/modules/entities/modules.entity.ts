import { Permission } from "src/modules/permission/entities/permission.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("modules")
export class Modules {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    update_at: Date;

    @Column({ length: 50 })
    create_by: string;

    @Column({ length: 50, nullable: true })
    update_by: string;

    @OneToMany(() => Permission, (permissions) => permissions.module)
    permissions: Permissions[];
}
