import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/entities/profile.entity';
import { EthnicitiesService } from '../category/ethnicities/ethnicities.service';
import { Ethnicity } from '../category/ethnicities/entities/ethnicity.entity';
import { ProfileRequest } from 'src/request/profile-request/entities/profile-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission, Profile, ProfileRequest])],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService, JwtService],
  exports: [UsersService]
})
export class UsersModule { }
