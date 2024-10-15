import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Major } from '../category/majors/entities/major.entity';
import { EducationType } from '../category/education-type/entities/education-type.entity';
import { Degree } from '../category/degrees/entities/degree.entity';
import { School } from '../category/schools/entities/school.entity';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education, Major, EducationType, Degree, School, Profile, User])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule { }
