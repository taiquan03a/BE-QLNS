import { Injectable } from '@nestjs/common';
import { CreateExperiencesRequestDto } from './dto/create-experiences-request.dto';
import { UpdateExperiencesRequestDto } from './dto/update-experiences-request.dto';

@Injectable()
export class ExperiencesRequestService {
  create(createExperiencesRequestDto: CreateExperiencesRequestDto) {
    return 'This action adds a new experiencesRequest';
  }

  findAll() {
    return `This action returns all experiencesRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experiencesRequest`;
  }

  update(id: number, updateExperiencesRequestDto: UpdateExperiencesRequestDto) {
    return `This action updates a #${id} experiencesRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} experiencesRequest`;
  }
}
