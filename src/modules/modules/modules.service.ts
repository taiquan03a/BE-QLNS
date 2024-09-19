import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Repository } from 'typeorm';
import { Modules } from './entities/modules.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private readonly modulesRepository: Repository<Modules>
  ) { }
  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  async findAll() {
    return await this.modulesRepository.find({ relations: ['permissions'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
