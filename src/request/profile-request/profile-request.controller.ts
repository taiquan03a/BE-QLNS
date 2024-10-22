import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileRequestService } from './profile-request.service';
import { CreateProfileRequestDto } from './dto/create-profile-request.dto';
import { UpdateProfileRequestDto } from './dto/update-profile-request.dto';

@Controller('profile-request')
export class ProfileRequestController {
  constructor(private readonly profileRequestService: ProfileRequestService) {}

  @Post()
  create(@Body() createProfileRequestDto: CreateProfileRequestDto) {
    return this.profileRequestService.create(createProfileRequestDto);
  }

  @Get()
  findAll() {
    return this.profileRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileRequestDto: UpdateProfileRequestDto) {
    return this.profileRequestService.update(+id, updateProfileRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileRequestService.remove(+id);
  }
}
