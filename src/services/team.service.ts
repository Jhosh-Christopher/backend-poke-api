import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Team } from "../entities/team.entity";
import { TeamPokemon } from "../entities/team-pokemon.entity";
import { CreateTeamDto } from "../dtos/create-team.dto";
import { UpdateTeamDto } from "../dtos/update-team.dto";
import { AddPokemonToTeamDto } from "../dtos/add-pokemon-to-team.dto";
import { PokeApiService} from "./pokeapi.service";
import { TrainerService } from "./trainer.service";
@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        @InjectRepository(TeamPokemon)
        private teamPokemonRepository: Repository<TeamPokemon>,
        private pokeApiService: PokeApiService,
        private trainerService: TrainerService
    ) {}

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        await this.trainerService.findOne(createTeamDto.trainer_id);
        const team = this.teamRepository.create(createTeamDto);
        return await this.teamRepository.save(team);
    }

    async findAll(): Promise<Team[]> {
        return await this.teamRepository.find({
            relations: ['trainer'],
            order: {
                team_name: 'ASC'
            }
        });
    }

    async findOne(id: string): Promise<Team> {
        const team = await this.teamRepository.findOne({
            where: { id },
            relations: ['trainer'],
        });
        if (!team) {
            throw new NotFoundException(`Team #${id} not found`);
        }
        return team;
    }

    async findByTrainerId(trainerId: string): Promise<Team[]> {
        await this.trainerService.findOne(trainerId);
        return await this.teamRepository.find({
            where: { trainer_id: trainerId },
            relations: ['trainer'],
            order: {
                team_name: 'ASC'
            }
        });
    }

    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        const team = await this.findOne(id);
        this.teamRepository.merge(team, updateTeamDto);
        return await this.teamRepository.save(team);
    }

    async remove(id: string): Promise<void> {
        const team = await this.findOne(id);
        await this.teamRepository.remove(team);
    }

    async addPokemonToTeam(id: string, addPokemonToTeamDto: AddPokemonToTeamDto): Promise<Team> {
        const team = await this.findOne(id);
        const pokemonExists = await this.pokeApiService.validatePokemonExists(addPokemonToTeamDto.external_id);
        if (!pokemonExists) {
            throw new NotFoundException(`Pokemon ${addPokemonToTeamDto.external_id} not found`);
        }
        const teamPokemon = this.teamPokemonRepository.create(addPokemonToTeamDto);
        teamPokemon.team = team;
        await this.teamPokemonRepository.save(teamPokemon);
        return team;
    }

    async removePokemonFromTeam(id: string, addPokemonToTeamDto: AddPokemonToTeamDto): Promise<Team> {
        const team = await this.findOne(id);
        const teamPokemon = await this.teamPokemonRepository.findOne({
            where: {
                team_id: team.id,
                external_id: addPokemonToTeamDto.external_id
            }
        });
        if (!teamPokemon) {
            throw new BadRequestException(`Pokemon ${addPokemonToTeamDto.external_id} not found in team ${team.id}`);
        }
        await this.teamPokemonRepository.remove(teamPokemon);
        return team;
    }

    async getTeamPokemon(id: string): Promise<TeamPokemon[]> {
        const team = await this.findOne(id);
        return team.team_pokemon;
    }
}
