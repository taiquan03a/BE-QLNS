import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { ProvinceService } from '../province/province.service';
import { Province } from '../province/entities/province.entity';
import { WardService } from '../ward/ward.service';
import { Ward } from '../ward/entities/ward.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([District, Province, Ward]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService, ProvinceService],
  exports: [DistrictService]
})
export class DistrictModule { }
