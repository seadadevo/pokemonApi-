import { useState } from "react";
import PokemonModal from "./PokemonModal";

const PokemonList = ({ pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {pokemon.map((result, idx) => {
          const id = result.url.split("/").filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div
              key={idx}
              onClick={() => setSelectedPokemon(result.url)}
              className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <img
                src={imageUrl}
                alt={result.name}
                className="w-20 h-20 object-contain mb-3"
              />
              <p className="capitalize font-semibold text-indigo-700">
                {result.name}
              </p>
            </div>
          );
        })}
      </div>

      {selectedPokemon && (
        <PokemonModal
          url={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  );
};

export default PokemonList;
