import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Relationship } from '../category/relationships/entities/relationship.entity';
import { Profile } from '../profile/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Family, Relationship, Profile])],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule { }
