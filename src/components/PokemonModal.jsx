import { useEffect, useState } from "react";
import axios from "axios";
import SpriteImage from "./SpriteImage";

const PokemonModal = ({ url, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(url);
      setDetails(res.data);
    };
    fetchDetails();
  }, [url]);

  if (!details)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl">Loading...</div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-2xl w-96 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 font-bold text-xl"
        >
          ✖
        </button>

        {/* Main Info */}
        <div className="flex flex-col items-center">
          <img
            src={details.sprites.front_default}
            alt={details.name}
            className="w-28 h-28 mb-4"
          />
          <h2 className="capitalize text-2xl font-bold text-indigo-700 mb-3">
            {details.name}
          </h2>

          <p className="text-gray-700">Height: {details.height}</p>
          <p className="text-gray-700">Weight: {details.weight}</p>
          <p className="text-gray-700 mb-3">
            Abilities: {details.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>

        {/* Extra Sprites */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SpriteImage src={details.sprites.back_default} alt="back view" />
          <SpriteImage src={details.sprites.front_shiny} alt="shiny front" />
          <SpriteImage src={details.sprites.back_shiny} alt="shiny back" />
          <SpriteImage
            src={details.sprites.other?.["official-artwork"]?.front_default}
            alt="official artwork"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
