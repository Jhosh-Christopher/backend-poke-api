import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
    @ApiProperty({description: 'The id of the team'})
    id: number;
    @ApiProperty({description: 'The name of the team', example: 'Capivaras'})
    team_name: string;
    @ApiProperty({description: 'The id of the trainer'})
    trainer_id: number;
}