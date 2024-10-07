import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { EducationTypeService } from './education-type.service';
import { CategoryDto } from '../category.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { EducationType } from './entities/education-type.entity';

@Controller('category/education-type')
export class EducationTypeController {
  constructor(private readonly educationTypeService: EducationTypeService) { }

  @Post()
  create(@Body() categoryDto: CategoryDto, @Request() req) {
    return this.educationTypeService.create(categoryDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<EducationType>> {
    return await this.educationTypeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationTypeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto, @Request() req) {
    return this.educationTypeService.update(+id, categoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationTypeService.remove(+id);
  }
}
