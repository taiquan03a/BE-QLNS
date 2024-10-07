import { Module } from '@nestjs/common';
import { EducationTypeService } from './education-type.service';
import { EducationTypeController } from './education-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationType } from './entities/education-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationType])],
  controllers: [EducationTypeController],
  providers: [EducationTypeService],
})
export class EducationTypeModule { }
