import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Major } from './entities/major.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from '../category.dto';
import { UserLogin } from 'src/types/userLogin';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private readonly majorRepository: Repository<Major>
  ) { }
  async create(categoryDto: CategoryDto, user: UserLogin) {
    const major = new Major();
    major.name = categoryDto.name;
    major.description = categoryDto.description;
    major.create_by = user.email;
    major.create_at = new Date();
    try {
      return await this.majorRepository.save(major);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<Major>> {
    return paginate(query, this.majorRepository, {
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
    return await this.majorRepository.findOne({ where: { id } });
  }

  async update(id: number, categoryDto: CategoryDto, user: UserLogin) {
    const ethnicity = await this.majorRepository.findOne({ where: { id } });
    if (ethnicity == null) throw new NotFoundException();
    ethnicity.name = categoryDto.name;
    ethnicity.description = categoryDto.description;
    ethnicity.update_by = user.email;
    ethnicity.update_at = new Date();
    try {
      return await this.majorRepository.save(ethnicity);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const ethnicity = await this.majorRepository.findOne({ where: { id } });
    return await this.majorRepository.remove(ethnicity);
  }
}
