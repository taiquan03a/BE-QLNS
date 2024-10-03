import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Code, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from '../users/entities/user.entity';
import { Permission } from '../permission/entities/permission.entity';
import { RoleDetail } from './dto/roleDetail.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) { }
  async create(createRoleDto: CreateRoleDto, user: any) {
    const checkCode = await this.roleRepository.existsBy({ code: createRoleDto.code })
    if (checkCode) throw new BadRequestException("Mã code đã bị trùng.")
    const permissionList: Permission[] = await this.permissionRepository.findByIds(createRoleDto.permissionId)
    const role: Role = new Role;
    role.code = createRoleDto.code;
    role.name = createRoleDto.name;
    role.create_at = new Date();
    role.create_by = user.username;
    role.permission = permissionList;
    return this.roleRepository.save(role);
  }
  findAll(query: PaginateQuery): Promise<Paginated<Role>> {
    return paginate(query, this.roleRepository, {
      sortableColumns: ['id', 'code', 'name'],
      nullSort: 'last',
      defaultLimit: 5,
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['code', 'name'],
      select: [
        'id',
        'code',
        'name',
        'create_at',
        'create_by',
        'update_at',
        'update_by',
      ],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        age: true,
      },
    })
  }

  async findOne(id: number): Promise<any> {
    let role: Role = await this.roleRepository.findOne({ where: { id } }) ?? null;
    let permission: Permission[] | null = null;
    const rolePermission: RoleDetail = new RoleDetail();
    if (role != null) {
      permission = await this.permissionRepository.findBy({ role: role }) ?? null;
      rolePermission.id = role.id;
      rolePermission.code = role.code;
      rolePermission.name = role.name;
      rolePermission.permissions = permission;
      return rolePermission;
    }
    throw new NotFoundException("NOT_FOUND_ROLE");
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, user: any): Promise<any> {
    let role: Role = await this.roleRepository.findOne({ where: { id } })
    if (!role) throw new NotFoundException();
    if (role.code != updateRoleDto.code) {
      const checkCode = await this.roleRepository.existsBy({ code: updateRoleDto.code })
      if (checkCode) throw new BadRequestException("Mã code đã bị trùng.")
    }

    const permissionList: Permission[] = await this.permissionRepository.findByIds(updateRoleDto.permissionId)
    role.name = updateRoleDto.name;
    role.code = updateRoleDto.code;
    role.update_at = new Date();
    role.update_by = user.username;
    role.permission = permissionList;
    return this.roleRepository.save(role);
  };
  async delete(id: number): Promise<any> {
    const role: Role = await this.roleRepository.findOne({ where: { id } });
    if (role == null) throw new NotFoundException();
    try {
      await this.roleRepository.delete(id);
    } catch (e) {
      throw new BadRequestException("Delete role fail!");
    }
  }
}
