import { Module } from '@nestjs/common';
import { EthnicitiesService } from './ethnicities.service';
import { EthnicitiesController } from './ethnicities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ethnicity } from './entities/ethnicity.entity';
import { ProfileRequest } from 'src/request/profile-request/entities/profile-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ethnicity, ProfileRequest])],
  controllers: [EthnicitiesController],
  providers: [EthnicitiesService],
  exports: [EthnicitiesService]
})
export class EthnicitiesModule { }
