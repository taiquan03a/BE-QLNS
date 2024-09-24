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
import { JwtAuthGuard } from './auths/passport/jwt-auth.guard';
import { ModulesModule } from './modules/modules/modules.module';
import { PermissionModule } from './modules/permission/permission.module';
import { Permission } from './modules/permission/entities/permission.entity';
import { TransformInterceptor } from './core/transform.interceptor';

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
        entities: [User, Role, Permission, Modules], // Cấu hình các entity
        synchronize: false, // Đồng bộ cấu trúc database tự động, chỉ dùng trong phát triển
      }),
    }),
    UsersModule,
    RoleModule,
    AuthsModule,
    ModulesModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }
  ],
})
export class AppModule { }
