import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Family } from './entities/family.entity';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) { }

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto, @Request() req) {
    return this.familiesService.create(createFamilyDto, req.user);
  }

  @Get(':userId')
  async findAll(@Paginate() query: PaginateQuery, @Param('userId') userId: number): Promise<Paginated<Family>> {
    return this.familiesService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familiesService.update(+id, updateFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(+id);
  }
}
