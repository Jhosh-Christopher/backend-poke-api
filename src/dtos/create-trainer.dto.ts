import {
    IsString,
    IsOptional,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional
} from '@nestjs/swagger';

export class CreateTrainerDto {
    @ApiProperty({description: 'The name of the trainer', example: 'Piá'})
    @IsString()
    name: string;

    @ApiPropertyOptional({description: 'The origin city of the trainer', example: 'Curitiba City'})
    @IsString()
    @IsOptional()
    origin_city: string
}