import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Trainer } from "./trainer.entity";
import { TeamPokemon } from "./team-pokemon.entity";

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length: 35})
    team_name: string;

    @Column({type:'uuid'})
    trainer_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @JoinColumn({name: 'trainer_id'})
    trainer: Trainer;

    @ManyToOne(() => Trainer, (trainer) => trainer.teams)
    onDelete: 'CASCADE';

    @OneToMany(() => TeamPokemon, (teamPokemon) => teamPokemon.team)
    team_pokemon: TeamPokemon[];
}