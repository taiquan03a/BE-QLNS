import { BadRequestException, HttpCode, Injectable, NotFoundException } from '@nestjs/common';
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
import { Permission } from '../permission/entities/permission.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as crypto from 'crypto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { MailService } from 'src/mail/mail.service';
import { UserLogin } from 'src/types/userLogin';
import { ConfirmPassword } from '../../auths/dto/resetPassword.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRopository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) { }

  async create(createUserDto: CreateUserDto, avatar: Express.Multer.File, userLogin: any) {
    console.log(createUserDto)
    const saltOrRounds = 10;
    const email = createUserDto.email;
    const existsEmail = await this.userRepository.findOne({ where: { email: email } });
    console.log(existsEmail)
    if (existsEmail != null) {
      throw new BadRequestException("Email đã tồn tại trong hệ thống.");
    }
    const res = await this.cloudinaryService.uploadFile(avatar, 'Avatar');
    console.log(res.url);
    const user = {
      avatar: res.url,
      // code: this.generateCode(2),
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltOrRounds),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      dateOfBirth: createUserDto.dateOfBirth,
      phoneNumber: createUserDto.phoneNumber,
      userType: UserType.QUANTRI,
      createAt: new Date(),
      createBy: userLogin.username,
      status: 1,
      roles: [
        await this.roleRopository.findOne({ where: { code: "QUANTRI" } })
      ]
    }
    return this.userRepository.save(user);
  }

  findAll(query: PaginateQuery): Promise<Paginated<User>> {
    const userAdmin = this.userRepository.findBy({ userType: UserType.QUANTRI })
    return paginate(query, this.userRepository, {
      where: {
        userType: UserType.QUANTRI,
      },
      sortableColumns: ['id', 'code', 'email', 'phoneNumber'],
      nullSort: 'last',
      defaultLimit: 5,
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
  findAllByUser(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      where: {
        userType: UserType.NHANVIEN,
      },
      sortableColumns: ['id', 'code', 'email', 'phoneNumber'],
      nullSort: 'last',
      defaultLimit: 5,
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

  async update(id: number, updateUserDto: UpdateUserDto, avatar: Express.Multer.File, userLogin: any) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    const saltOrRounds = 10;
    const email = updateUserDto.email;
    if (updateUserDto.email != user.email) {
      const existsEmail = await this.userRepository.findOne({ where: { email: email } });

      console.log(existsEmail)
      if (existsEmail != null) {
        throw new BadRequestException("Email đã tồn tại trong hệ thống.");
      }
    }
    if (avatar != undefined) {
      const res = await this.cloudinaryService.uploadFile(avatar, 'Avatar');
      user.avatar = res.url;
    }
    user.email = updateUserDto.email;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.dateOfBirth = updateUserDto.dateOfBirth;
    user.phoneNumber = updateUserDto.phoneNumber;
    user.updateAt = new Date();
    user.updateBy = userLogin.username;
    return this.userRepository.save(user);
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
  async findPermissionByUser(userId: number) {
    const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] })
    const permissions = [];
    for (const role of user.roles) {
      const permission: Permission[] = await this.permissionRepository.findBy({ role: role });
      for (const it of permission) {
        permissions.push(it.code);
      }
    }
    return permissions;
  }
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async active(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (user == null) throw new NotFoundException();
    if (user.status != null) {
      user.status = 1 - user.status;
    }
    else {
      user.status = 1;
    }
    try {
      this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException("Fail!.");
    }
    return user;
  }
  async getDetailByUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user == null) throw new NotFoundException("user not found.");
    if (user.userType == UserType.QUANTRI) throw new BadRequestException("user detail fail.");
    return user;
  }
  async createEmployee(createUserDto: CreateUserDto, avatar: Express.Multer.File, userLogin: UserLogin) {
    console.log(createUserDto)
    const saltOrRounds = 10;
    const email = createUserDto.email;
    const existsEmail = await this.userRepository.findOne({ where: { email: email } });
    console.log(existsEmail)
    if (existsEmail != null) {
      throw new BadRequestException("Email đã tồn tại trong hệ thống.");
    }
    const res = await this.cloudinaryService.uploadFile(avatar, 'Avatar');
    console.log(res.url);
    const user = new User();
    user.avatar = res.url;
    // code= this.generateCode(2);
    user.email = createUserDto.email;
    //user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.dateOfBirth = createUserDto.dateOfBirth;
    user.phoneNumber = createUserDto.phoneNumber;
    user.userType = UserType.NHANVIEN;
    user.createAt = new Date();
    user.createBy = userLogin.email;
    user.status = null;
    user.roles = [
      await this.roleRopository.findOne({ where: { code: "NHANVIEN" } })
    ]
    const code: string = this.generateRandomCode();
    user.otp = code;
    const token: string = this.generateVerificationToken(user.email, code);
    await this.mailService.sendUserConfirmation(user, token);
    return this.userRepository.save(user);
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

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

