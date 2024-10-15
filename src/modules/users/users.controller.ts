import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Request, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import { Public } from 'src/auths/passport/public';
import { AuthorizationGuard } from 'src/auths/guard/authorization.guard';
import { Permissions } from 'src/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfirmPassword } from '../../auths/dto/resetPassword.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';


@Controller('users')
@UseGuards(AuthorizationGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('avatar',
    {
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 50, // Giới hạn kích thước file 5MB
      },
    }
  ))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar: Express.Multer.File, @Request() req) {
    return this.usersService.create(createUserDto, avatar, req.user);
  }

  @Post('employee')
  @UseInterceptors(FileInterceptor('avatar',
    {
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 50,
      },
    }
  ))
  createEmployee(@Body() createUserDto: CreateEmployeeDto, @UploadedFile() avatar: Express.Multer.File, @Request() req) {
    return this.usersService.createEmployee(createUserDto, avatar, req.user);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.usersService.findAll(query);
  }
  @Get('byNhanVien')
  findByUser(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.usersService.findAllByUser(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return "id"
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar',
    {
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 50, // Giới hạn kích thước file 5MB
      },
    }
  ))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() avatar: Express.Multer.File, @Request() req) {
    return this.usersService.update(+id, updateUserDto, avatar, req.user);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Get('active/:id')
  active(@Param('id') id: number) {
    return this.usersService.active(id);
  }
  @Post('/upload/hihi')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file, 'Avatar');
  }

  @Get('userDetail/:id')
  getUserDetail(@Param('id') id: number) {
    return this.usersService.getDetailByUser(id);
  }
  @Public()
  @Get("confirm/:token")
  confirmToken(@Param('token') token: string) {
    return this.confirmToken(token);
  }


}
