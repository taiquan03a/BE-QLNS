import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EthnicitiesService } from '../category/ethnicities/ethnicities.service';
import { Ethnicity } from '../category/ethnicities/entities/ethnicity.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User, Role, Permission, Ethnicity]), JwtModule],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, CloudinaryService, EthnicitiesService],
  exports: [ProfileService]
})
export class ProfileModule { }
