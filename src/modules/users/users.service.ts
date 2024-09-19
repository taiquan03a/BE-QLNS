import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Role } from '../role/entities/role.entity';
import { UserType } from './enum/user.enum';
import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRopository: Repository<Role>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const email = createUserDto.email;
    const existsEmail = await this.userRepository.findOne({ where: { email: email } });
    console.log(existsEmail)
    if (existsEmail != null) {
      throw new BadRequestException("Email đã tồn tại trong hệ thống.");
    }
    const user = {
      avatar: createUserDto.avatar,
      // code: this.generateCode(2),
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltOrRounds),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      dateOfBirth: createUserDto.dateOfBirth,
      phoneNumber: createUserDto.phoneNumber,
      userType: UserType.QUANTRI,
      roles: [
        await this.roleRopository.findOne({ where: { code: "QUANTRI" } })
      ]
    }
    return this.userRepository.save(user);
  }

  findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'code', 'email', 'phoneNumber'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['code', 'email', 'phoneNumber'],
      select: [
        'id',
        'avatar',
        'code', 'email',
        'password',
        'firstName',
        'lastName',
        'dateOfBirth',
        'phoneNumber',
        'userType',
        'createAt',
        'createBy',
        'updateAt',
        'updateBy',
        'status'
      ],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        age: true,
      },
    })
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (user == null) return null;
    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass == false) return null;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async authSignIn(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (user == null) return false;
    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass == false) return false;
    return true;
  }
  generateCode(id: number): string {
    const prefix = 'B24QT'
    const idStr = id.toString().padStart(3, '0');
    return `${prefix}${idStr}`;
  }
}
