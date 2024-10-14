import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { RoleModule } from './modules/role/role.module';
import { Role } from './modules/role/entities/role.entity';
import { Modules } from "src/modules/modules/entities/modules.entity";
import { AuthsModule } from './auths/auths.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auths/guard/jwt-auth.guard';
import { ModulesModule } from './modules/modules/modules.module';
import { PermissionModule } from './modules/permission/permission.module';
import { Permission } from './modules/permission/entities/permission.entity';
import { TransformInterceptor } from './core/transform.interceptor';
import { AuthorizationGuard } from './auths/guard/authorization.guard';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EthnicitiesModule } from './modules/category/ethnicities/ethnicities.module';
import { MajorsModule } from './modules/category/majors/majors.module';
import { RelationshipsModule } from './modules/category/relationships/relationships.module';
import { DegreesModule } from './modules/category/degrees/degrees.module';
import { EducationTypeModule } from './modules/category/education-type/education-type.module';
import { SchoolsModule } from './modules/category/schools/schools.module';
import { Degree } from './modules/category/degrees/entities/degree.entity';
import { Major } from './modules/category/majors/entities/major.entity';
import { Ethnicity } from './modules/category/ethnicities/entities/ethnicity.entity';
import { Relationship } from './modules/category/relationships/entities/relationship.entity';
import { EducationType } from './modules/category/education-type/entities/education-type.entity';
import { School } from './modules/category/schools/entities/school.entity';
import { ProvinceModule } from './modules/category/address/province/province.module';
import { DistrictModule } from './modules/category/address/district/district.module';
import { WardModule } from './modules/category/address/ward/ward.module';
import { Province } from './modules/category/address/province/entities/province.entity';
import { District } from './modules/category/address/district/entities/district.entity';
import { Ward } from './modules/category/address/ward/entities/ward.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { FamiliesModule } from './modules/families/families.module';
import { Profile } from './modules/profile/entities/profile.entity';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          User,
          Role,
          Permission,
          Modules,
          Degree,
          Major,
          Ethnicity,
          Relationship,
          EducationType,
          School,
          Province,
          District,
          Ward,
          Profile],
        synchronize: false, // Đồng bộ cấu trúc database tự động, chỉ dùng trong phát triển
      }),
    }),
    UsersModule,
    RoleModule,
    AuthsModule,
    ModulesModule,
    PermissionModule,
    CloudinaryModule,
    EthnicitiesModule,
    MajorsModule,
    RelationshipsModule,
    DegreesModule,
    EducationTypeModule,
    SchoolsModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
    ProfileModule,
    ExperiencesModule,
    FamiliesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AuthorizationGuard
  ],
})
export class AppModule { }
