import { Injectable } from '@nestjs/common';
import { CreateProfileRequestDto } from './dto/create-profile-request.dto';
import { UpdateProfileRequestDto } from './dto/update-profile-request.dto';

@Injectable()
export class ProfileRequestService {
  create(createProfileRequestDto: CreateProfileRequestDto) {
    return 'This action adds a new profileRequest';
  }

  findAll() {
    return `This action returns all profileRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileRequest`;
  }

  update(id: number, updateProfileRequestDto: UpdateProfileRequestDto) {
    return `This action updates a #${id} profileRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileRequest`;
  }
}
