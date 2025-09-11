import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class QueryPagination {
    
    // ---------------------------- QUERY ----------------------------
    @ApiPropertyOptional({
        type: 'string',
        description: 'Query for search on name',
        example: 'Alisher'
    })
    @IsString()
    @IsOptional()
    query?: string

    // ---------------------------- PAGE ----------------------------
    @ApiPropertyOptional({
        type: 'string',
        description: 'Which page',
        example: 1
    })
    @IsString()
    @Type(() => Number)
    @IsOptional()
    page?: number

    // ---------------------------- LIMIT ----------------------------
    @ApiPropertyOptional({
        type: 'string',
        description: 'How many limit',
        example: 10
    })
    @IsString()
    @Type(() => Number)
    @IsOptional()
    limit?: number
}