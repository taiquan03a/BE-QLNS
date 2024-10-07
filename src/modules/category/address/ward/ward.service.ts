import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { Repository } from 'typeorm';
import { ProvinceService } from '../province/province.service';
import { DistrictService } from '../district/district.service';
import { District } from '../district/entities/district.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserLogin } from 'src/types/userLogin';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    private readonly districtService: DistrictService,
  ) { }
  async create(createWardDto: CreateWardDto, user: UserLogin) {
    const ward = new Ward();
    ward.name = createWardDto.name;
    ward.description = createWardDto.description;
    ward.create_by = user.email;
    ward.create_at = new Date();
    ward.district = await this.districtService.findOne(createWardDto.id);
    try {
      return await this.wardRepository.save(ward);
    } catch (e) {
      throw new BadRequestException("Fail!!");
    }
  }

  async findAll(query: PaginateQuery, districtId: number): Promise<Paginated<Ward>> {
    const district: District = await this.districtService.findOne(districtId);
    if (district == null) throw new NotFoundException();
    return paginate(query, this.wardRepository, {
      where: {
        district: district,
      },
      sortableColumns: ['id', 'name'],
      searchableColumns: ['id', 'name'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 5,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ward`;
  }

  async update(id: number, updateWardDto: UpdateWardDto, user: UserLogin) {
    const ward: Ward = await this.wardRepository.findOne({ where: { id } });
    if (ward == null) throw new NotFoundException();
    ward.name = updateWardDto.name;
    ward.description = updateWardDto.description;
    ward.update_by = user.email;
    ward.update_at = new Date();
    ward.district = await this.districtService.findOne(updateWardDto.id);
    try {
      return await this.wardRepository.save(ward);
    } catch (e) {
      throw new BadRequestException("Fail!!");
    }
  }

  remove(id: number) {
    return `This action removes a #${id} ward`;
  }
}
