import { Link } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  url: string;
}

// Componente para exibir um cartão de Pokémon com lógica para construção de URL de imagem
export function PokemonCard({ name, url }: PokemonCardProps) {
  // Extrai o ID do Pokémon a partir da URL fornecida pela API
  const urlParts = url.split('/');
  const pokemonId = urlParts[urlParts.length - 2];
  
  // Constrói a URL da imagem usando o ID do Pokémon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <Link 
      to={`/pokemon/${name}`}
      className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col items-center transform transition-transform duration-200 hover:scale-105 cursor-pointer hover:shadow-lg"
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-32 h-32 object-contain mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800 capitalize">
        {name}
      </h3>
    </Link>
  );
}