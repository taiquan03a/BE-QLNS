import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Major } from '../category/majors/entities/major.entity';
import { School } from '../category/schools/entities/school.entity';
import { Degree } from '../category/degrees/entities/degree.entity';
import { UserLogin } from 'src/types/userLogin';
import { EducationType } from '../category/education-type/entities/education-type.entity';
import { Profile } from '../profile/entities/profile.entity';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Major)
    private readonly majorRepository: Repository<Major>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Degree)
    private readonly degreeRepository: Repository<Degree>,
    @InjectRepository(EducationType)
    private readonly educationTypeRepository: Repository<EducationType>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

  ) { }


  async create(createEducationDto: CreateEducationDto, user: UserLogin) {
    const education = new Education();
    const userId = createEducationDto.profileId;
    education.begin_time = createEducationDto.beginTime;
    education.end_time = createEducationDto.endTime;
    education.school = await this.schoolRepository.findOne({ where: { id: createEducationDto.schoolId } });
    education.major = await this.majorRepository.findOne({ where: { id: createEducationDto.majorId } });
    education.degree = await this.degreeRepository.findOne({ where: { id: createEducationDto.degreeId } });
    education.create_at = new Date();
    education.create_by = user.email;
    education.educationType = await this.educationTypeRepository.findOne({ where: { id: createEducationDto.educationTypeId } });
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :userId', { userId })
      .limit(1)
      .getMany()
    education.profile = profile[0];
    return await this.educationRepository.save(education);
  }

  async findAll(query: PaginateQuery, userId: number): Promise<Paginated<Education>> {
    const profile: Profile = await this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :userId', { userId })
      .getOne()
    if (profile == null) throw new NotFoundException();
    const queryBuilder = this.educationRepository
      .createQueryBuilder('education')
      .leftJoinAndSelect('education.school', 'school')
      .leftJoinAndSelect('education.degree', 'degree')
      .leftJoinAndSelect('education.educationType', 'educationType')
      .leftJoinAndSelect('education.major', 'major')
      .where('education.profile_id = :profileId', { profileId: profile.id });

    return paginate(query, queryBuilder, {
      sortableColumns: ['id', 'begin_time', 'end_time', 'school.name', 'major.name', 'educationType.name', 'degree.name'],
      searchableColumns: ['id', 'begin_time', 'end_time', 'school.name', 'major.name', 'educationType.name', 'degree.name'],
      defaultSortBy: [['id', 'ASC']],
      defaultLimit: 5,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} education`;
  }

  update(id: number, updateEducationDto: UpdateEducationDto) {
    return `This action updates a #${id} education`;
  }

  remove(id: number) {
    return `This action removes a #${id} education`;
  }
}
