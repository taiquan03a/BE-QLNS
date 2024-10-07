import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { DegreesService } from './degrees.service';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Degree } from './entities/degree.entity';

@Controller('category/degrees')
export class DegreesController {
  constructor(private readonly degreesService: DegreesService) { }

  @Post()
  create(@Body() createDegreeDto: CreateDegreeDto, @Request() req) {
    return this.degreesService.create(createDegreeDto, req.user);
  }
  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Degree>> {
    return await this.degreesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.degreesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDegreeDto: UpdateDegreeDto, @Request() req) {
    return this.degreesService.update(+id, updateDegreeDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreesService.remove(+id);
  }
}
