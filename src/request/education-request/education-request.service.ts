import { Injectable } from '@nestjs/common';
import { CreateEducationRequestDto } from './dto/create-education-request.dto';
import { UpdateEducationRequestDto } from './dto/update-education-request.dto';

@Injectable()
export class EducationRequestService {
  create(createEducationRequestDto: CreateEducationRequestDto) {
    return 'This action adds a new educationRequest';
  }

  findAll() {
    return `This action returns all educationRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} educationRequest`;
  }

  update(id: number, updateEducationRequestDto: UpdateEducationRequestDto) {
    return `This action updates a #${id} educationRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} educationRequest`;
  }
}
