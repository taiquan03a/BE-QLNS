import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { EthnicitiesService } from './ethnicities.service';
import { CreateEthnicityDto } from './dto/create-ethnicity.dto';
import { UpdateEthnicityDto } from './dto/update-ethnicity.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Ethnicity } from './entities/ethnicity.entity';

@Controller('category/ethnicities')
export class EthnicitiesController {
  constructor(private readonly ethnicitiesService: EthnicitiesService) { }

  @Post()
  create(@Body() createEthnicityDto: CreateEthnicityDto, @Request() req) {
    return this.ethnicitiesService.create(createEthnicityDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Ethnicity>> {
    return await this.ethnicitiesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ethnicitiesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEthnicityDto: UpdateEthnicityDto, @Request() req) {
    return this.ethnicitiesService.update(+id, updateEthnicityDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ethnicitiesService.remove(+id);
  }
}
