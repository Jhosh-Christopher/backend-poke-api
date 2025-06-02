import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Team } from "./team.entity";

@Entity('teams_pokemons')
export class TeamPokemon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'uuid'})
    team_id: string;

    @Column({type:'varchar', length: 50})
    external_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Team, (team) => team.team_pokemon,{
        onDelete: 'CASCADE'
    })

    @JoinColumn({name: 'team_id'})
    team: Team;
}