
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainerService, TeamService } from './services';
import { 
    CreateTrainerDto, 
    UpdateTrainerDto, 
    TrainerResponseDto,
    CreateTeamDto,
    UpdateTeamDto,
    TeamResponseDto,
    AddPokemonToTeamDto,
    TeamPokemonResponseDto
} from './dtos';
import e from 'express';

// ============= TRAINER CONTROLLER ========================================
@ApiTags('Trainers')
@Controller('trainers')
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new trainer' })
    @ApiResponse({ status: 201, type: TrainerResponseDto })
    async create(@Body() createTrainerDto: CreateTrainerDto) {
        return await this.trainerService.create(createTrainerDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all trainers' })
    @ApiResponse({ status: 200, type: [TrainerResponseDto] })
    async findAll() {
        return await this.trainerService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Search trainer by id' })
    @ApiResponse({ status: 200, type: TrainerResponseDto })
    async findOne(@Param('id') id: string) {
        return await this.trainerService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update trainer' })
    @ApiResponse({ status: 200, type: TrainerResponseDto })
    async update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
        return await this.trainerService.update(id, updateTrainerDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete trainer' })
    @ApiResponse({ status: 204})
    async remove(@Param('id') id: string) {
        return await this.trainerService.remove(id);
    }
    }

// ============= TEAM CONTROLLER ===================================
@ApiTags('Teams')
@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new team' })
    @ApiResponse({ status: 201, type: TeamResponseDto })
    async create(@Body() createTeamDto: CreateTeamDto) {
        return await this.teamService.createTeam(createTeamDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all teams' })
    @ApiResponse({ status: 200, type: [TeamResponseDto] })
    async findAll() {
        return await this.teamService.findAll();
    }

    @Get('trainer/:trainerId')
    @ApiOperation({ summary: 'List all teams by trainer' })
    @ApiResponse({ status: 200, type: [TeamResponseDto] })
    async findByTrainer(@Param('trainerId') trainerId: string) {
        return await this.teamService.findByTrainerId(trainerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Search team by id' })
    @ApiResponse({ status: 200, type: TeamResponseDto })
    async findOne(@Param('id') id: string) {
        return await this.teamService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update team' })
    @ApiResponse({ status: 200, type: TeamResponseDto })
    async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return await this.teamService.update(id, updateTeamDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete team' })
    @ApiResponse({ status: 204 })
    async remove(@Param('id') id: string) {
        return await this.teamService.remove(id);}

  // ============= POKEMON ENDPOINTS =====================================

    @Post(':teamId/pokemons')
    @ApiOperation({ summary: 'Add Pokémon to team' })
    @ApiResponse({ status: 201, type: TeamPokemonResponseDto })
    async addPokemon(
    @Param('teamId') teamId: string,
    @Body() addPokemonDto: AddPokemonToTeamDto
    ) {
        return await this.teamService.addPokemonToTeam(teamId, addPokemonDto);
    }

    @Get(':teamId/pokemons')
    @ApiOperation({ summary: 'List all Pokémon in team' })
    @ApiResponse({ status: 200, type: [TeamPokemonResponseDto] })
    async getTeamPokemons(@Param('teamId') teamId: string) {
        return await this.teamService.getTeamPokemon(teamId);
    }

    @Delete(':teamId/pokemons/:pokemonId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove Pokémon from team' })
    @ApiResponse({ status: 204 })
    async removePokemon(
    @Param('teamId') teamId: string,
    @Param('pokemonId') pokemonId: string
    ) {
        return await this.teamService.removePokemonFromTeam(teamId, { external_id: pokemonId });
    }
    }