import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('experiences')
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    begin_time: Date;

    @Column({ type: 'date' })
    end_time: Date;

    @Column({ type: 'varchar', length: 50 })
    company: string;

    @Column({ type: 'varchar', length: 50 })
    position: string;

    @ManyToOne(() => Profile, profile => profile.experiences)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date;

    @Column({ type: 'varchar', length: 50 })
    create_by: string;

    @Column({ type: 'varchar', length: 50 })
    update_by: string;
}
