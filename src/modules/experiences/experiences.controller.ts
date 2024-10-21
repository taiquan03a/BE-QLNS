import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Experience } from './entities/experience.entity';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) { }

  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto, @Request() req) {
    return this.experiencesService.create(createExperienceDto, req.user);
  }

  @Get(':userId')
  async findAll(@Paginate() query: PaginateQuery, @Param('userId') userId: number): Promise<Paginated<Experience>> {
    return this.experiencesService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

  @Put()
  update(@Body() updateExperienceDto: UpdateExperienceDto, @Request() req) {
    return this.experiencesService.update(updateExperienceDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(+id);
  }
}
