import { ApiProperty } from '@nestjs/swagger';

export class PokemonResponseDto {
    @ApiProperty({description: 'The id of the pokemon'})
    id: number;
    @ApiProperty({description: 'The name of the pokemon'})
    name: string;
}