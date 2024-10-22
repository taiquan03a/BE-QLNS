import { Module } from '@nestjs/common';
import { ExperiencesRequestService } from './experiences-request.service';
import { ExperiencesRequestController } from './experiences-request.controller';

@Module({
  controllers: [ExperiencesRequestController],
  providers: [ExperiencesRequestService],
})
export class ExperiencesRequestModule {}
