import { Module } from '@nestjs/common';
import { ProfileRequestService } from './profile-request.service';
import { ProfileRequestController } from './profile-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRequest } from './entities/profile-request.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Ethnicity } from 'src/modules/category/ethnicities/entities/ethnicity.entity';
import { StatusRequest } from '../status-request/entities/status-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRequest, User, Ethnicity, StatusRequest])],
  controllers: [ProfileRequestController],
  providers: [ProfileRequestService],
  exports: [ProfileRequestModule]
})
export class ProfileRequestModule { }
