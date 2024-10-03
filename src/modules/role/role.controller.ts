import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put, Res, HttpStatus, Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';


@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @Request() req) {
    return this.roleService.create(createRoleDto, req.user);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Role>> {
    const check = await this.roleService.findAll(query);
    console.log(check);
    return this.roleService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    return this.roleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Request() req) {
    return this.roleService.update(+id, updateRoleDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.delete(+id);
  }
}
