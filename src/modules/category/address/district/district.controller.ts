import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { District } from './entities/district.entity';

@Controller('address/district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto, @Request() req) {
    return this.districtService.create(createDistrictDto, req.user);
  }

  @Get('getByProvince/:provinceId')
  async findAll(@Paginate() query: PaginateQuery, @Param('provinceId') provinceId: number): Promise<Paginated<District>> {
    return this.districtService.findAll(query, provinceId);
  }
  @Get('getByUser/:provinceId')
  async findByUser(@Param('provinceId') provinceId: number) {
    return this.districtService.findAllByUser(provinceId);
  }
  @Get('getByWard/:wardId')
  getByWard(@Param('wardId') wardId: number) {
    return this.districtService.findDistrictByWard(wardId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("id->", id);
    return this.districtService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto, @Request() req) {
    return this.districtService.update(+id, updateDistrictDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
