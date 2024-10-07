import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEthnicityDto } from './dto/create-ethnicity.dto';
import { UpdateEthnicityDto } from './dto/update-ethnicity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ethnicity } from './entities/ethnicity.entity';
import { Repository } from 'typeorm';
import e from 'express';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserLogin } from 'src/types/userLogin';

@Injectable()
export class EthnicitiesService {
  constructor(
    @InjectRepository(Ethnicity)
    private readonly ethnicityRepository: Repository<Ethnicity>,
  ) { }
  async create(createEthnicityDto: CreateEthnicityDto, user: UserLogin) {
    const ethnicity = new Ethnicity();
    ethnicity.name = createEthnicityDto.name;
    ethnicity.description = createEthnicityDto.description;
    ethnicity.create_by = user.email;
    ethnicity.create_at = new Date();
    try {
      return await this.ethnicityRepository.save(ethnicity);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<Ethnicity>> {
    return paginate(query, this.ethnicityRepository, {
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
    return await this.ethnicityRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEthnicityDto: UpdateEthnicityDto, user: UserLogin) {
    const ethnicity = await this.ethnicityRepository.findOne({ where: { id } });
    if (ethnicity == null) throw new NotFoundException();
    ethnicity.name = updateEthnicityDto.name;
    ethnicity.description = updateEthnicityDto.description;
    ethnicity.update_by = user.email;
    ethnicity.update_at = new Date();
    try {
      return await this.ethnicityRepository.save(ethnicity);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const ethnicity = await this.ethnicityRepository.findOne({ where: { id } });
    return await this.ethnicityRepository.remove(ethnicity);
  }
}
