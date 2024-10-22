import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusRequestService } from './status-request.service';
import { CreateStatusRequestDto } from './dto/create-status-request.dto';
import { UpdateStatusRequestDto } from './dto/update-status-request.dto';

@Controller('status-request')
export class StatusRequestController {
  constructor(private readonly statusRequestService: StatusRequestService) {}

  @Post()
  create(@Body() createStatusRequestDto: CreateStatusRequestDto) {
    return this.statusRequestService.create(createStatusRequestDto);
  }

  @Get()
  findAll() {
    return this.statusRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusRequestDto: UpdateStatusRequestDto) {
    return this.statusRequestService.update(+id, updateStatusRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusRequestService.remove(+id);
  }
}
