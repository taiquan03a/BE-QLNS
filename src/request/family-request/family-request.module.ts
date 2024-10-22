import { Module } from '@nestjs/common';
import { FamilyRequestService } from './family-request.service';
import { FamilyRequestController } from './family-request.controller';

@Module({
  controllers: [FamilyRequestController],
  providers: [FamilyRequestService],
})
export class FamilyRequestModule {}
