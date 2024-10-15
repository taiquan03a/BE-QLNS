import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from '../../category.dto';
import { UserLogin } from 'src/types/userLogin';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { District } from '../district/entities/district.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>
  ) { }
  async create(categoryDto: CategoryDto, user: UserLogin) {
    const relationship = new Province();
    relationship.name = categoryDto.name;
    relationship.description = categoryDto.description;
    relationship.create_by = user.email;
    relationship.create_at = new Date();
    try {
      return await this.provinceRepository.save(relationship);
    }
    catch (e) {
      throw new BadRequestException('Fail.->' + e);
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<Province>> {
    return paginate(query, this.provinceRepository, {
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

  async findByDistrict(districtId: number) {
    const district: District = await this.districtRepository.findOne({ where: { id: districtId }, relations: ['province'] });
    return district.province;
  }
  async findOne(id: number) {
    return await this.provinceRepository.findOne({ where: { id } });
  }

  async update(id: number, categoryDto: CategoryDto, user: UserLogin) {
    const relationship = await this.provinceRepository.findOne({ where: { id } });
    if (relationship == null) throw new NotFoundException();
    relationship.name = categoryDto.name;
    relationship.description = categoryDto.description;
    relationship.update_by = user.email;
    relationship.update_at = new Date();
    try {
      return await this.provinceRepository.save(relationship);
    }
    catch (e) {
      throw new BadRequestException('Fail.');
    }
  }

  async remove(id: number) {
    const relationship = await this.provinceRepository.findOne({ where: { id } });
    return await this.provinceRepository.remove(relationship);
  }
}
