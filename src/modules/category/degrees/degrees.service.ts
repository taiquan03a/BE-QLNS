import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Degree } from './entities/degree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, paginate, Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class DegreesService {
  constructor(
    @InjectRepository(Degree)
    private readonly degreeRepository: Repository<Degree>,
  ) { }
  async create(createDegreeDto: CreateDegreeDto, user: any) {
    const degree = new Degree();
    degree.name = createDegreeDto.name;
    degree.description = createDegreeDto.description;
    degree.create_by = user.username;
    degree.create_at = new Date();
    try {
      return await this.degreeRepository.save(degree);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<Degree>> {
    return paginate(query, this.degreeRepository, {
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
    return await this.degreeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDegreeDto: UpdateDegreeDto, user: any) {
    const degree = await this.degreeRepository.findOne({ where: { id } });
    if (degree == null) throw new NotFoundException();
    degree.name = updateDegreeDto.name;
    degree.description = updateDegreeDto.description;
    degree.update_by = user.username;
    degree.update_at = new Date();
    try {
      return await this.degreeRepository.save(degree);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const degree = await this.degreeRepository.findOne({ where: { id } });
    return await this.degreeRepository.remove(degree);
  }
}
