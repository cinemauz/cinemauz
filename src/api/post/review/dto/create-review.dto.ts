import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsOptional()
    comment: string;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating: number;

    @IsInt()
    @IsNotEmpty()
    customer_id: number;

    @IsInt()
    @IsNotEmpty()
    movie_id: number;
}
