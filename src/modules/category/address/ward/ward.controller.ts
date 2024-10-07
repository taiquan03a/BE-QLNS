import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { WardService } from './ward.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Ward } from './entities/ward.entity';

@Controller('address/ward')
export class WardController {
  constructor(private readonly wardService: WardService) { }

  @Post()
  create(@Body() createWardDto: CreateWardDto, @Request() req) {
    return this.wardService.create(createWardDto, req.user);
  }

  @Get('getByDistrict/:districtId')
  async findAll(@Paginate() query: PaginateQuery, @Param('districtId') districtId: number): Promise<Paginated<Ward>> {
    return this.wardService.findAll(query, districtId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wardService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateWardDto: UpdateWardDto, @Request() req) {
    return this.wardService.update(+id, updateWardDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wardService.remove(+id);
  }
}
