import axios from 'axios';
import type { PokemonListResponse, PokemonDetails } from '../types/pokemon';

// Configura a instância do Axios para a base URL da PokeAPI
export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

// Serviço para interagir com a PokeAPI
export const PokemonService = {
  // Busca a lista de Pokémon 
  getPokemonList: async (): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>('/pokemon?limit=151');
    return response.data;
  },

  // Busca detalhes de um Pokémon específico por nome
  getPokemonDetails: async (name: string): Promise<PokemonDetails> => {
    const response = await api.get<PokemonDetails>(`/pokemon/${name}`);
    return response.data;
  }
};