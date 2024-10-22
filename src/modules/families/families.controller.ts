import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put, Req } from '@nestjs/common';
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
  @Get('user/getByUser')
  async findAllByUser(@Paginate() query: PaginateQuery, @Request() req): Promise<Paginated<Family>> {
    return this.familiesService.findAllByUser(query, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiesService.findOne(+id);
  }

  @Put()
  update(@Body() updateFamilyDto: UpdateFamilyDto, @Request() req) {
    return this.familiesService.update(updateFamilyDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(+id);
  }
}
