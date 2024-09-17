import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Code, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) { }
  create(createRoleDto: CreateRoleDto) {
    const role = {
      code: createRoleDto.code,
      name: createRoleDto.name,
      create_at: new Date(),
      create_by: "AMDIN"
    }
    return this.roleRepository.save(role);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Role>> {
    return paginate(query, this.roleRepository, {
      sortableColumns: ['id', 'code', 'name'],
      nullSort: 'last',
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

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    let role = await this.roleRepository.findOne({ where: { id } })
    if (!role) return "NOT FOUND"
    role.name = updateRoleDto.name;
    role.code = updateRoleDto.code;
    role.update_at = new Date();
    role.update_by = "ADMIN";
    return this.roleRepository.save(role);
  };


  async delete(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
