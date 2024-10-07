import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { ProvinceService } from '../province/province.service';
import { Province } from '../province/entities/province.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([District, Province]),

  ],
  controllers: [DistrictController],
  providers: [DistrictService, ProvinceService],
})
export class DistrictModule { }
