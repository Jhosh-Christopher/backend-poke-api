import {
    ApiProperty
} from '@nestjs/swagger';

export class TrainerResponseDto {
    @ApiProperty({description: 'The id of the trainer'})
    id: number
    @ApiProperty({description: 'The name of the trainer', example: 'Piá'})
    name: string
    @ApiProperty({description: 'The origin city of the trainer', example: 'Curitiba City'})
    origin_city: string
}