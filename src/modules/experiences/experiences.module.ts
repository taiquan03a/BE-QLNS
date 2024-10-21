import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Experience } from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Experience])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule { }
