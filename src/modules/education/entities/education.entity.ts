import { Degree } from 'src/modules/category/degrees/entities/degree.entity';
import { EducationType } from 'src/modules/category/education-type/entities/education-type.entity';
import { Major } from 'src/modules/category/majors/entities/major.entity';
import { School } from 'src/modules/category/schools/entities/school.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('educations')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: true })
    begin_time: Date;

    @Column({ type: 'date', nullable: true })
    end_time: Date;

    @ManyToOne(() => School, school => school.educations)
    @JoinColumn({ name: 'school_id' })
    school: School;

    @ManyToOne(() => Major, major => major.educations)
    @JoinColumn({ name: 'major_id' })
    major: Major;

    @ManyToOne(() => EducationType, educationType => educationType.educations)
    @JoinColumn({ name: 'type_id' })
    educationType: EducationType;

    @ManyToOne(() => Degree, degree => degree.educations)
    @JoinColumn({ name: 'degree_id' })
    degree: Degree;

    @ManyToOne(() => Profile, profile => profile.educations)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    create_by: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    update_by: string;
}
