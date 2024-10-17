import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Education } from './entities/education.entity';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  @Post()
  create(@Body() createEducationDto: CreateEducationDto, @Request() req) {
    return this.educationService.create(createEducationDto, req.user);
  }

  @Get(':userId')
  async findAll(@Paginate() query: PaginateQuery, @Param('userId') userId: number): Promise<Paginated<Education>> {
    return this.educationService.findAll(query, userId);
  }


  @Put()
  update(@Body() updateEducationDto: UpdateEducationDto, @Request() req) {
    return this.educationService.update(updateEducationDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
