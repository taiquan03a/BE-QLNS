import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { District } from '../district/entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService]
})
export class ProvinceModule { }
