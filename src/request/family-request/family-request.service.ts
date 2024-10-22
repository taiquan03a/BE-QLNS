import { Injectable } from '@nestjs/common';
import { CreateFamilyRequestDto } from './dto/create-family-request.dto';
import { UpdateFamilyRequestDto } from './dto/update-family-request.dto';

@Injectable()
export class FamilyRequestService {
  create(createFamilyRequestDto: CreateFamilyRequestDto) {
    return 'This action adds a new familyRequest';
  }

  findAll() {
    return `This action returns all familyRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familyRequest`;
  }

  update(id: number, updateFamilyRequestDto: UpdateFamilyRequestDto) {
    return `This action updates a #${id} familyRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} familyRequest`;
  }
}
