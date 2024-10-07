import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CategoryDto } from '../category.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { School } from './entities/school.entity';

@Controller('category/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) { }

  @Post()
  create(@Body() categoryDto: CategoryDto, @Request() req) {
    return this.schoolsService.create(categoryDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<School>> {
    return await this.schoolsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto, @Request() req) {
    return this.schoolsService.update(+id, categoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(+id);
  }
}
