import { useState, useEffect } from 'react';
import { PokemonService } from '../services/api';
import type { PokemonListItem } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';

// Componente principal da página inicial, responsável por buscar e exibir a lista de Pokémon
export function Home() {

  // Estado para armazenar a lista de Pokémon e o status de carregamento
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Filtra a lista de Pokémon com base no termo de busca, com ignorecase para facilitar a busca
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderiza a interface do usuário, mostrando um loading enquanto os dados são buscados e depois exibindo os cartões de Pokémon
  return (
    <div className="min-h-screen bg-gray-50 p-8">
<header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-red-600 drop-shadow-sm">Pokédex</h1>
        <p className="text-lg text-gray-600 mt-4 mb-8">
          Explore o mundo dos Pokémon! Clique em um cartão para ver detalhes sobre cada criatura.
        </p>
        
        <div className="max-w-xl mx-auto relative">

          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <span className="text-gray-400 text-xl">🔍</span>
          </div>

          <input
            type="text"
            placeholder="Buscar Pokémon por nome..."
    
            className="w-full py-4 pl-14 pr-6 rounded-full border-2 border-gray-100 bg-white shadow-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 focus:outline-none transition-all duration-300 text-lg text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {isLoading ? (
        <div className="text-center text-xl font-semibold">Carregando Pokémon...</div>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Itera sobre a lista de Pokémon e renderiza um cartão para cada um usando o componente PokemonCard */} 
          {filteredPokemon.map((pokemon) => (
            <PokemonCard 
              key={pokemon.name} 
              name={pokemon.name} 
              url={pokemon.url} 
            />
          ))}
        </main>
      )}
      {/* Imprime uma mensagem caso nenhum Pokémon seja encontrado com o termo de busca */}
      {!isLoading && filteredPokemon.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-xl">Nenhum Pokémon encontrado com esse nome.</p>
      )}
    </div>
  );
}