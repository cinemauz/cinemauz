import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env.config';
import { AdminModule } from './user/admin/admin.module';
import { CustomerModule } from './user/customer/customer.module';
import { GenreModule } from './post/genre/genre.module';
import { ReviewModule } from './post/review/review.module';
import { MovieModule } from './post/movie/movie.module';
import { RoomModule } from './post/room/room.module';
import { ShowtimeModule } from './post/showtime/showtime.module';
import { TicketModule } from './post/ticket/ticket.module';
import { OrderModule } from './post/order/order.module';
import { PaymentModule } from './post/payment/payment.module';
import { WalletModule } from './post/wallet/wallet.module';
import { AuthModule } from './user/auth/auth.module';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from 'src/infrastructure/redis/Redis';

@Module({
  imports: [

    // ========================= DATABASE =========================
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: true,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: ['error', 'warn'],
    }),

    // ========================= JWT =========================
    JwtModule.register({
      global: true,
    }),
    // ========================= MODULE =========================
    AdminModule,
    CustomerModule,
    GenreModule,
    ReviewModule,
    MovieModule,
    RoomModule,
    ShowtimeModule,
    TicketModule,
    OrderModule,
    PaymentModule,
    WalletModule,
    AuthModule,
  ],
  providers: [CryptoService,RedisService],
})
export class AppModule {}
