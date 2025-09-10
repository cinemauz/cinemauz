import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class CreateShowtimeDto {
    @IsInt()
    @IsNotEmpty()
    movie_id: number;

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    stock_quantity: number;

    @IsInt()
    @IsNotEmpty()
    room_id: number;

    @IsDateString()
    @IsNotEmpty()
    start_time: Date;

    @IsDateString()
    @IsNotEmpty()
    end_time: Date;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
