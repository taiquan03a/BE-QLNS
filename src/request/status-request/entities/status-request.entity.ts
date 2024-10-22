import { ProfileRequest } from "src/request/profile-request/entities/profile-request.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('status_request')
export class StatusRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    description: string;

    @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
    updateAt: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
    createBy: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    updateBy: string;

    // @OneToMany(() => ProfileRequest, (profileRequest) => profileRequest.statusRequest)
    // profileRequest: ProfileRequest[];
}
