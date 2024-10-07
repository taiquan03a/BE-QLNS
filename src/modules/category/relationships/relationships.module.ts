import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relationship } from './entities/relationship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship])],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
})
export class RelationshipsModule { }
