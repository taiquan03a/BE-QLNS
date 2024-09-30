import { Modules } from "src/modules/modules/entities/modules.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    code: string

    @Column({ unique: true })
    name: string

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    update_at: Date;

    @Column({ length: 50 })
    create_by: string;

    @Column({ length: 50, nullable: true })
    update_by: string;

    @ManyToOne(() => Modules, module => module.permissions)
    @JoinColumn({ name: 'module_id' })
    module: Modules;

    @ManyToMany(() => Role, role => role.permission)
    role?: Role[];
}
