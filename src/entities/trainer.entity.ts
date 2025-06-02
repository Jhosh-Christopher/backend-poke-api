import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Team } from "./team.entity";

@Entity('trainers')
export class Trainer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length: 35})
    name: string;

    @Column({type:'varchar', length: 35})
    origin_city: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Team, (team) => team.trainer)
    teams: Team[];
}