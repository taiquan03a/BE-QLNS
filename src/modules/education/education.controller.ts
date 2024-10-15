import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
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


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
