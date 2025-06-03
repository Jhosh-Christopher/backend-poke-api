import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";

export interface PokemonData {
    id: number;
    name: string;
}

@Injectable()
export class PokeApiService {
private readonly httpClient: AxiosInstance;
private readonly baseUrl: string;

constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('POKEAPI_BASE_URL') || 'https://pokeapi.co/api/v2';
    this.httpClient = axios.create({
    baseURL: this.baseUrl,
    timeout: 10000,
    });
}

async getPokemon(externalId: string): Promise<PokemonData> {
    try {
    const response = await this.httpClient.get<PokemonData>(`/pokemon/${externalId.toLowerCase()}`);
    return response.data;
    } catch (error) {
    if (error.response?.status === 404) {
        throw new NotFoundException(`Pokémon '${externalId} not found'`);
    }
    throw new Error(`Error fetching Pokémon data: ${error.message}`);
    }
}

async validatePokemonExists(externalId: string): Promise<boolean> {
    try {
    await this.getPokemon(externalId);
    return true;
    } catch (error) {
    if (error instanceof NotFoundException) {
        return false;
    }
    throw error;
    }
}

formatPokemonData(pokemonData: PokemonData) {
    return {
    id: pokemonData.id,
    name: pokemonData.name
    };
}
}