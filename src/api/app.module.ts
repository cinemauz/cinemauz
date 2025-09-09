import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env.config';
import { AdminModule } from './user/admin/admin.module';
import { CustomerModule } from './user/customer/customer.module';
import { GenreModule } from './post/genre/genre.module';
import { ReviewModule } from './post/review/review.module';
import { MovieModule } from './post/movie/movie.module';
import { CountryModule } from './post/country/country.module';
import { RoomModule } from './post/room/room.module';
import { ShowtimeModule } from './post/showtime/showtime.module';
import { TicketModule } from './post/ticket/ticket.module';
import { OrderModule } from './post/order/order.module';
import { PaymentModule } from './post/payment/payment.module';
import { WalletModule } from './post/wallet/wallet.module';

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
    CustomerModule,
    GenreModule,
    ReviewModule,
    MovieModule,
    CountryModule,
    RoomModule,
    ShowtimeModule,
    TicketModule,
    OrderModule,
    PaymentModule,
    WalletModule,
  ],
})
export class AppModule {}
