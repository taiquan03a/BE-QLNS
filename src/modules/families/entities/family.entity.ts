import { Relationship } from 'src/modules/category/relationships/entities/relationship.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('families')
export class Family {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    full_name: string;

    @Column({ type: 'int' })
    year_of_birth: number;

    @Column({ type: 'varchar', length: 255 })
    job: string;

    @Column({ type: 'varchar', length: 50 })
    address_detail: string;

    @Column({ type: 'int' })
    ward_id: number;

    @ManyToOne(() => Relationship, relationship => relationship.families)
    @JoinColumn({ name: 'relationship_id' })
    relationship: Relationship;

    @ManyToOne(() => Profile, profile => profile.families)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;

    @Column({ type: 'varchar', length: 50 })
    create_by: string;

    @Column({ type: 'varchar', length: 50 })
    update_by: string;
}
