import { Module } from '@nestjs/common';
import { StatusRequestService } from './status-request.service';
import { StatusRequestController } from './status-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRequest } from '../profile-request/entities/profile-request.entity';
import { StatusRequest } from './entities/status-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusRequest, ProfileRequest])],
  controllers: [StatusRequestController],
  providers: [StatusRequestService],
  exports: [StatusRequestModule]
})
export class StatusRequestModule { }
