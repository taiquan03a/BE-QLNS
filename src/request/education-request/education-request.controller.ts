import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationRequestService } from './education-request.service';
import { CreateEducationRequestDto } from './dto/create-education-request.dto';
import { UpdateEducationRequestDto } from './dto/update-education-request.dto';

@Controller('education-request')
export class EducationRequestController {
  constructor(private readonly educationRequestService: EducationRequestService) {}

  @Post()
  create(@Body() createEducationRequestDto: CreateEducationRequestDto) {
    return this.educationRequestService.create(createEducationRequestDto);
  }

  @Get()
  findAll() {
    return this.educationRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationRequestDto: UpdateEducationRequestDto) {
    return this.educationRequestService.update(+id, updateEducationRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationRequestService.remove(+id);
  }
}
