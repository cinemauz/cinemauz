import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Country } from "src/config/country.config";
import { Languages } from "src/config/lang.config";

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    duration: Date;

    @IsOptional()
    @IsDateString()
    realase_date?: Date;

    @IsUrl()
    @IsNotEmpty()
    image_url: string;

    @IsUrl()
    @IsNotEmpty()
    video_url: string;

    @IsOptional()
    @IsEnum(Languages)
    language?: Languages;

    @IsOptional()
    @IsEnum(Country)
    country?: Country;

    @IsInt()
    @IsNotEmpty()
    genre_id: number;

    @IsInt()
    @IsNotEmpty()
    admin_id: number;
}
