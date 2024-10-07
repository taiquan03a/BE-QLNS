import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CategoryDto } from '../category.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Major } from './entities/major.entity';

@Controller('category/majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) { }

  @Post()
  create(@Body() categoryDto: CategoryDto, @Request() req) {
    return this.majorsService.create(categoryDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Major>> {
    return await this.majorsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.majorsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto, @Request() req) {
    return this.majorsService.update(+id, categoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.majorsService.remove(+id);
  }
}
