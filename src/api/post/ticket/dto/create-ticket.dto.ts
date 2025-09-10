import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateTicketDto {
    @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  showtime_id: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
