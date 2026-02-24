import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PokemonService } from '../services/api';
import type { PokemonDetails} from '../types/pokemon';

// Componente para exibir os detalhes de um Pokémon específico
export function Details() {
  // Extrai o parâmetro 'name' da URL usando useParams para identificar qual Pokémon deve ser buscado
  const { name } = useParams<{ name: string }>();
  
  // Estados para armazenar os detalhes do Pokémon e o status de carregamento 
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect para buscar os detalhes do Pokémon quando o componente é montado ou quando o nome do Pokémon na URL mudar
  useEffect(() => {
    const fetchDetails = async () => {
      if (!name) return;
      
      try {
        const data = await PokemonService.getPokemonDetails(name);
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  // Exibe um indicador de carregamento enquanto os detalhes do Pokémon estão sendo buscados
  if (isLoading) {
    return <div className="text-center mt-20 text-2xl font-bold">Carregando detalhes...</div>;
  }

  // Exibe uma mensagem de erro se o Pokémon não for encontrado ou se houver um problema na busca dos detalhes
  if (!pokemon) {
    return <div className="text-center mt-20 text-red-500 text-2xl">Pokémon não encontrado!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <Link 
        to="/" 
        className="mb-8 px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition-colors"
      >
        &larr; Retornar para a Pokédex
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full border border-gray-100">
        <h1 className="text-4xl font-black capitalize text-gray-800 mb-6">
          {pokemon.name}
        </h1>
        
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className="w-56 h-56 object-contain mb-8 drop-shadow-lg"
        />
        
        <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <div className="flex justify-between mb-4 text-lg">
            <span className="font-semibold text-gray-500">Height:</span>
            {/* PokeAPI retorna a altura em decímetros. Dividir por 10 para obter metros. */}
            <span className="font-bold text-gray-800">{pokemon.height / 10} m</span>
          </div>
          
          <div className="flex justify-between mb-6 text-lg">
            <span className="font-semibold text-gray-500">Weight:</span>
            {/* PokeAPI retorna o peso em hectogramas. Dividir por 10 para obter quilogramas. */}
            <span className="font-bold text-gray-800">{pokemon.weight / 10} kg</span>
          </div>
          
          <div>
            <span className="font-semibold text-gray-500 block mb-3 text-lg">Types:</span>
            <div className="flex gap-3">
              {/* Itera sobre o array de tipos para criar badges de UI */}
              {pokemon.types.map((t) => (
                <span 
                  key={t.type.name} 
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full capitalize font-bold text-sm"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}