import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from 'src/core/entity/post/ticket.entity';
import { BaseService } from 'src/infrastructure/base/base.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService extends BaseService<
  CreateTicketDto,
  UpdateTicketDto,
  TicketEntity
> {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepo: Repository<TicketEntity>,
  ) {
    super(ticketRepo);
  }
}
