import { useState, useEffect } from 'react';
import { PokemonService } from '../services/api';
import type { PokemonListItem } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';

// Componente principal da página inicial, responsável por buscar e exibir a lista de Pokémon
export function Home() {

  // Estado para armazenar a lista de Pokémon e o status de carregamento
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect para buscar os dados dos Pokémon quando o componente é montado
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await PokemonService.getPokemonList();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []); 

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-black text-red-600">Pokédex</h1>
      </header>

      // Exibe um indicador de carregamento enquanto os dados estão sendo buscados ou a grade de cartões de Pokémon quando os dados estiverem prontos
      {isLoading ? (
        <div className="text-center text-xl font-semibold">Loading Pokémon...</div>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {}
          // Mapeia a lista de Pokémon para renderizar um cartão para cada um usando o componente PokemonCard
          {pokemonList.map((pokemon) => (
            <PokemonCard 
              key={pokemon.name} 
              name={pokemon.name} 
              url={pokemon.url} 
            />
          ))}
        </main>
      )}
    </div>
  );
}