import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Ethnicity } from '../category/ethnicities/entities/ethnicity.entity';
import { EthnicitiesService } from '../category/ethnicities/ethnicities.service';
import * as crypto from 'crypto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UsersService,
    private readonly ethnicityService: EthnicitiesService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) { }
  async create(createProfileDto: CreateProfileDto) {
    const user: User = await this.userService.findOne(createProfileDto.userId);
    if (user == null) throw new NotFoundException();
    const ethnicity: Ethnicity = await this.ethnicityService.findOne(createProfileDto.ethnicityId);
    if (ethnicity == null) throw new NotFoundException();
    const profile = new Profile();
    const code = this.generateRandomCode();
    const token = this.generateVerificationToken(user.email, code);
    console.log(token);
    await this.mailService.sendUserConfirmation(user, token);
    return 'This action adds a new profile';
  }
  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.VALI_SECRET_KET });
      const { email, code } = decoded;
      return { message: 'Token is valid. Proceed to password reset.' };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BadRequestException('Token has expired');
      } else {
        throw new BadRequestException('Invalid token');
      }
    }
  }
  generateRandomCode(): string {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
  }

  generateVerificationToken(email: string, code: string): string {
    const payload = { email, code };
    return this.jwtService.sign(payload, {
      secret: process.env.VALI_SECRET_KET,
      expiresIn: process.env.VALI_EXPIRATION,
    });
  }
  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: number) {
    const user: User = await this.userService.findOne(id);
    if (user == null) throw new NotFoundException();
    return await this.profileRepository.findOne({ where: { user: user } })
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
