import { Module } from '@nestjs/common';
import { EducationRequestService } from './education-request.service';
import { EducationRequestController } from './education-request.controller';

@Module({
  controllers: [EducationRequestController],
  providers: [EducationRequestService],
})
export class EducationRequestModule {}
