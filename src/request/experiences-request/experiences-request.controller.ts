import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperiencesRequestService } from './experiences-request.service';
import { CreateExperiencesRequestDto } from './dto/create-experiences-request.dto';
import { UpdateExperiencesRequestDto } from './dto/update-experiences-request.dto';

@Controller('experiences-request')
export class ExperiencesRequestController {
  constructor(private readonly experiencesRequestService: ExperiencesRequestService) {}

  @Post()
  create(@Body() createExperiencesRequestDto: CreateExperiencesRequestDto) {
    return this.experiencesRequestService.create(createExperiencesRequestDto);
  }

  @Get()
  findAll() {
    return this.experiencesRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperiencesRequestDto: UpdateExperiencesRequestDto) {
    return this.experiencesRequestService.update(+id, updateExperiencesRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesRequestService.remove(+id);
  }
}
