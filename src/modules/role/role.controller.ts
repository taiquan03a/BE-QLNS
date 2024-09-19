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
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Role>> {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const role = await this.roleService.findOne(+id);
    if (!role) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: "NOT_FOUND"
      });
    }
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "OK",
      data: role
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.delete(+id);
  }
}
