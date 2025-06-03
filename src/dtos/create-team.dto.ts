import{
    IsString,
    IsUUID
} from 'class-validator';

import {
    ApiProperty
} from '@nestjs/swagger';

export class CreateTeamDto{
    @ApiProperty({description: 'The id of the trainer'})
    @IsUUID()
    trainer_id: string;

    @ApiProperty({description: 'The name of the team', example: 'Capivaras'})
    @IsString()
    team_name: string;
}