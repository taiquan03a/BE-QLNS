import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from '../category.dto';
import { UserLogin } from 'src/types/userLogin';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>
  ) { }
  async create(categoryDto: CategoryDto, user: UserLogin) {
    const school = new School();
    school.name = categoryDto.name;
    school.description = categoryDto.description;
    school.create_by = user.email;
    school.create_at = new Date();
    try {
      return await this.schoolRepository.save(school);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<School>> {
    return paginate(query, this.schoolRepository, {
      sortableColumns: ['id', 'name', 'description'],
      nullSort: 'last',
      defaultLimit: 5,
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'description'],
      select: [
        'id',
        'name',
        'description',
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

  async findOne(id: number) {
    return await this.schoolRepository.findOne({ where: { id } });
  }

  async update(id: number, categoryDto: CategoryDto, user: UserLogin) {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (school == null) throw new NotFoundException();
    school.name = categoryDto.name;
    school.description = categoryDto.description;
    school.update_by = user.email;
    school.update_at = new Date();
    try {
      return await this.schoolRepository.save(school);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const school = await this.schoolRepository.findOne({ where: { id } });
    return await this.schoolRepository.remove(school);
  }
}
