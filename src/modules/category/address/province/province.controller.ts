import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CategoryDto } from '../../category.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Province } from './entities/province.entity';

@Controller('category/province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) { }

  @Post()
  create(@Body() categoryDto: CategoryDto, @Request() req) {
    return this.provinceService.create(categoryDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Province>> {
    return await this.provinceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto, @Request() req) {
    return this.provinceService.update(+id, categoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinceService.remove(+id);
  }
}
