import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_at?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at?: Date;

    @Column({ type: 'varchar', length: 50 })
    create_by?: string;

    @Column({ type: 'varchar', length: 50 })
    update_by?: string;
}
