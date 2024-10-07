import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Repository } from 'typeorm';
import { UserLogin } from 'src/types/userLogin';
import { ProvinceService } from '../province/province.service';
import { paginate, Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { plainToInstance } from 'class-transformer';
import { DistrictDto } from './dto/district.dto';
import { SortBy } from 'nestjs-paginate/lib/helper';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    private readonly provinceService: ProvinceService,
  ) { }
  async create(createDistrictDto: CreateDistrictDto, user: UserLogin) {
    const district = new District();
    district.name = createDistrictDto.name;
    district.description = createDistrictDto.description;
    district.create_by = user.email;
    district.create_at = new Date();
    district.province = await this.provinceService.findOne(createDistrictDto.id);
    try {
      return await this.districtRepository.save(district);
    } catch (e) {
      throw new BadRequestException("Fail!!");
    }
  }
  async findAll(query: PaginateQuery, provinceId: number): Promise<Paginated<District>> {
    console.log("provinceId->", provinceId)
    const province = await this.provinceService.findOne(provinceId);
    if (!province) {
      throw new NotFoundException('Province not found.');
    }
    return paginate(query, this.districtRepository, {
      where: {
        province: province,
      },
      sortableColumns: ['id', 'name'],
      searchableColumns: ['id', 'name'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 10,
    });
  }
  async findAllByUser(provinceId: number): Promise<DistrictDto[]> {
    console.log("provinceId->", provinceId)
    const province = await this.provinceService.findOne(provinceId);
    if (!province) {
      throw new NotFoundException('Province not found.');
    }
    const districtDtos: DistrictDto[] = null;
    const districts = await this.districtRepository.findAndCount({
      where: { province: province },
    });
    console.log("district->", districts);
    for (const it of await this.districtRepository.findBy({ province: province })) {
      const dis: DistrictDto = {
        id: it.id,
        name: it.name
      }
      console.log('dis->', dis);
      districtDtos.push(dis);
    }
    return districtDtos;
  }
  async findOne(id: number) {
    console.log(await this.districtRepository.findOne({ where: { id } }));
    return await this.districtRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto, user: UserLogin) {
    const district = await this.districtRepository.findOne({ where: { id } });
    if (district == null) throw new NotFoundException();
    district.name = updateDistrictDto.name;
    district.description = updateDistrictDto.description;
    district.update_by = user.email;
    district.update_at = new Date();
    district.province = await this.provinceService.findOne(updateDistrictDto.id);
    try {
      return await this.districtRepository.save(district);
    } catch (e) {
      throw new BadRequestException("Fail!!");
    }
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
