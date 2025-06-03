import { ApiProperty } from '@nestjs/swagger';
import { PokemonResponseDto } from './pokemon-response.dto';

export class TeamPokemonResponseDto {
    @ApiProperty({ type: PokemonResponseDto })
    pokemon: PokemonResponseDto;
}