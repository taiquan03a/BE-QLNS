import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ProxyOptions, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Ethnicity } from '../category/ethnicities/entities/ethnicity.entity';
import { EthnicitiesService } from '../category/ethnicities/ethnicities.service';
import { UserLogin } from 'src/types/userLogin';
import { UserType } from '../users/enum/user.enum';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UsersService,
    private readonly ethnicityService: EthnicitiesService,
  ) { }
  async create(createProfileDto: CreateProfileDto) {
    const user: User = await this.userService.findOne(createProfileDto.userId);
    if (user == null) throw new NotFoundException();
    const ethnicity: Ethnicity = await this.ethnicityService.findOne(createProfileDto.ethnicityId);
    if (ethnicity == null) throw new NotFoundException();
    const profile: Profile = await this.profileRepository.findOne({ where: { user: user } });
    profile.sex = createProfileDto.sex;
    profile.cccd = createProfileDto.cccd;
    profile.hometown_detail = createProfileDto.hometown_detail;
    profile.hometown_ward_id = createProfileDto.hometown_ward_id;
    profile.address_now_detail = createProfileDto.address_now_detail;
    profile.address_now_ward_id = createProfileDto.address_now_ward_id;
    profile.permanent_address_ward_id = createProfileDto.permanent_address_ward_id;
    profile.permanent_address_detail = createProfileDto.permanent_address_detail;
    profile.ethnicity = await this.ethnicityService.findOne(createProfileDto.ethnicityId);
    profile.education_level = createProfileDto.education_level;
    return await this.profileRepository.save(profile);
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: number) {
    const user: User = await this.userService.findOne(id);
    if (user == null) throw new NotFoundException();
    return await this.profileRepository.findOne({ where: { user: user }, relations: ['ethnicity'] });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
  async save(profile: Profile) {
    await this.profileRepository.save(profile);
  }

  async getByUser(userLogin: UserLogin) {
    const user: User = await this.userService.findOne(userLogin.id);
    if (user == null) throw new NotFoundException();
    return await this.profileRepository.findOne({ where: { user: user }, relations: ['ethnicity'] });
  }
}
