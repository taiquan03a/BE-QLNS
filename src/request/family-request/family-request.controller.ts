import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyRequestService } from './family-request.service';
import { CreateFamilyRequestDto } from './dto/create-family-request.dto';
import { UpdateFamilyRequestDto } from './dto/update-family-request.dto';

@Controller('family-request')
export class FamilyRequestController {
  constructor(private readonly familyRequestService: FamilyRequestService) {}

  @Post()
  create(@Body() createFamilyRequestDto: CreateFamilyRequestDto) {
    return this.familyRequestService.create(createFamilyRequestDto);
  }

  @Get()
  findAll() {
    return this.familyRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyRequestDto: UpdateFamilyRequestDto) {
    return this.familyRequestService.update(+id, updateFamilyRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyRequestService.remove(+id);
  }
}
