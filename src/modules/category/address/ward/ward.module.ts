import { Module } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '../province/entities/province.entity';
import { District } from '../district/entities/district.entity';
import { Ward } from './entities/ward.entity';
import { ProvinceService } from '../province/province.service';
import { DistrictService } from '../district/district.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [WardController],
  providers: [WardService, DistrictService, ProvinceService],
})
export class WardModule { }
