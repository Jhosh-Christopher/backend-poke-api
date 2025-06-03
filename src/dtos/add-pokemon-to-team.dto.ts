import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddPokemonToTeamDto {
    @ApiProperty({description: 'ID from PokeApi'})
    @IsString()
    @IsNotEmpty()
    external_id: string;
}