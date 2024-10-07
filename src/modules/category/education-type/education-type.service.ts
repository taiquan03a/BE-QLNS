import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationType } from './entities/education-type.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from '../category.dto';
import { UserLogin } from 'src/types/userLogin';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class EducationTypeService {
  constructor(
    @InjectRepository(EducationType)
    private readonly educationTypeRepository: Repository<EducationType>
  ) { }
  async create(categoryDto: CategoryDto, user: UserLogin) {
    const educationType = new EducationType();
    educationType.name = categoryDto.name;
    educationType.description = categoryDto.description;
    educationType.create_by = user.email;
    educationType.create_at = new Date();
    try {
      return await this.educationTypeRepository.save(educationType);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<EducationType>> {
    return paginate(query, this.educationTypeRepository, {
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
    return await this.educationTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, categoryDto: CategoryDto, user: UserLogin) {
    const educationType = await this.educationTypeRepository.findOne({ where: { id } });
    if (educationType == null) throw new NotFoundException();
    educationType.name = categoryDto.name;
    educationType.description = categoryDto.description;
    educationType.update_by = user.email;
    educationType.update_at = new Date();
    try {
      return await this.educationTypeRepository.save(educationType);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const educationType = await this.educationTypeRepository.findOne({ where: { id } });
    return await this.educationTypeRepository.remove(educationType);
  }
}
