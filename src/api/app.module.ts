import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env.config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: true,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
    }),
    AdminModule,
  ],
})
export class AppModule {}
