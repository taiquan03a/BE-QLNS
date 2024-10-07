import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { CategoryDto } from '../category.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Relationship } from './entities/relationship.entity';

@Controller('category/relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) { }

  @Post()
  create(@Body() categoryDto: CategoryDto, @Request() req) {
    return this.relationshipsService.create(categoryDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Relationship>> {
    return await this.relationshipsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationshipsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto, @Request() req) {
    return this.relationshipsService.update(+id, categoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationshipsService.remove(+id);
  }
}
