import { Injectable } from '@nestjs/common';
import { CreateStatusRequestDto } from './dto/create-status-request.dto';
import { UpdateStatusRequestDto } from './dto/update-status-request.dto';

@Injectable()
export class StatusRequestService {
  create(createStatusRequestDto: CreateStatusRequestDto) {
    return 'This action adds a new statusRequest';
  }

  findAll() {
    return `This action returns all statusRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusRequest`;
  }

  update(id: number, updateStatusRequestDto: UpdateStatusRequestDto) {
    return `This action updates a #${id} statusRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusRequest`;
  }
}
