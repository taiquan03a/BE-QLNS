import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relationship } from './entities/relationship.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from '../category.dto';
import { UserLogin } from 'src/types/userLogin';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private readonly relationshipRepository: Repository<Relationship>
  ) { }
  async create(categoryDto: CategoryDto, user: UserLogin) {
    const relationship = new Relationship();
    relationship.name = categoryDto.name;
    relationship.description = categoryDto.description;
    relationship.create_by = user.email;
    relationship.create_at = new Date();
    try {
      return await this.relationshipRepository.save(relationship);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<Relationship>> {
    return paginate(query, this.relationshipRepository, {
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
    return await this.relationshipRepository.findOne({ where: { id } });
  }

  async update(id: number, categoryDto: CategoryDto, user: UserLogin) {
    const relationship = await this.relationshipRepository.findOne({ where: { id } });
    if (relationship == null) throw new NotFoundException();
    relationship.name = categoryDto.name;
    relationship.description = categoryDto.description;
    relationship.update_by = user.email;
    relationship.update_at = new Date();
    try {
      return await this.relationshipRepository.save(relationship);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const relationship = await this.relationshipRepository.findOne({ where: { id } });
    return await this.relationshipRepository.remove(relationship);
  }
}
