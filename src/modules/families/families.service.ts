import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { UserLogin } from 'src/types/userLogin';
import { Family } from './entities/family.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relationship } from '../category/relationships/entities/relationship.entity';
import { Profile } from '../profile/entities/profile.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FamilyTable } from './dto/family.table';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
    @InjectRepository(Relationship)
    private readonly relationshipRepository: Repository<Relationship>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }
  async create(createFamilyDto: CreateFamilyDto, user: UserLogin) {
    const userId = createFamilyDto.profile_id;
    const family = new Family();
    family.full_name = createFamilyDto.full_name;
    family.address_detail = createFamilyDto.address_detail;
    family.job = createFamilyDto.job;
    family.year_of_birth = createFamilyDto.year_of_birth;
    family.relationship = await this.relationshipRepository.findOne({ where: { id: createFamilyDto.relationshipId } });
    family.createAt = new Date();
    family.create_by = user.email;
    family.ward_id = createFamilyDto.ward_id;
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :userId', { userId })
      .limit(1)
      .getMany()
    family.profile = profile[0];
    return await this.familyRepository.save(family);
  }

  async findAll(query: PaginateQuery, userId: number): Promise<Paginated<Family>> {
    const profile: Profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :userId', { userId })
      .getOne()
    if (profile == null) throw new NotFoundException();
    const families: Family[] = await this.familyRepository
      .createQueryBuilder('families')
      .where('families.profile_id = :profileId', { profileId: profile.id })
      .getMany()
    for (const family of families) {
      const familyTable = new FamilyTable();
      familyTable.id = family.id;
      familyTable.full_name = family.full_name;
      familyTable.job = family.job;
      familyTable.relationship = family.relationship.name;

    }
    const queryBuilder = this.familyRepository
      .createQueryBuilder('families')
      .leftJoinAndSelect('families.relationship', 'relationship')
      .where('families.profile_id = :profileId', { profileId: profile.id });

    return paginate(query, queryBuilder, {
      sortableColumns: ['id', 'relationship.name', 'full_name', 'year_of_birth', 'job'],
      searchableColumns: ['id', 'relationship.name', 'full_name', 'year_of_birth', 'job'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 5,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} family`;
  }

  update(id: number, updateFamilyDto: UpdateFamilyDto) {
    return `This action updates a #${id} family`;
  }

  remove(id: number) {
    return `This action removes a #${id} family`;
  }
}
