import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { UserLogin } from 'src/types/userLogin';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }
  async create(createExperienceDto: CreateExperienceDto, user: UserLogin) {
    const experience = new Experience();
    const userId = createExperienceDto.profileId;
    experience.begin_time = createExperienceDto.begin_time;
    experience.end_time = createExperienceDto.end_time;
    experience.company = createExperienceDto.company;
    experience.position = createExperienceDto.position;
    experience.create_at = new Date();
    experience.create_by = user.email;
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :userId', { userId })
      .limit(1)
      .getMany()
    experience.profile = profile[0];
    return await this.experienceRepository.save(experience);
  }

  async findAll(query: PaginateQuery, userId: number): Promise<Paginated<Experience>> {
    const profile: Profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :userId', { userId })
      .getOne()
    if (profile == null) throw new NotFoundException();
    const queryBuilder = this.experienceRepository
      .createQueryBuilder('experiences')
      .where('experiences.profile_id = :profileId', { profileId: profile.id });

    return paginate(query, queryBuilder, {
      sortableColumns: ['id', 'begin_time', 'end_time',],
      searchableColumns: ['id', 'begin_time', 'end_time',],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 5,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  async update(updateExperienceDto: UpdateExperienceDto, user: UserLogin) {
    const experience = await this.experienceRepository.findOne({ where: { id: updateExperienceDto.profileId } });
    experience.begin_time = updateExperienceDto.begin_time;
    experience.end_time = updateExperienceDto.end_time;
    experience.company = updateExperienceDto.company;
    experience.position = updateExperienceDto.position;
    experience.update_at = new Date();
    experience.update_by = user.email;
    return await this.experienceRepository.save(experience);
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
