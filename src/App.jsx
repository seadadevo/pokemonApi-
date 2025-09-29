import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";

function App() {
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [search, setSearch] = useState("");

  const fetchPokemon = async ({ queryKey }) => {
    const url = queryKey[1];
    const res = await axios.get(url);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", currentPageUrl],
    queryFn: fetchPokemon,
    keepPreviousData: true, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  // pagination info
  const pokemon = data.results;
  const nextPageUrl = data.next;
  const prevPageUrl = data.previous;
  const count = data.count;
  const limit = 20;
  const page = Math.floor(
    (new URL(currentPageUrl).searchParams.get("offset") || 0) / limit
  ) + 1;
  const totalPages = Math.ceil(count / limit);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Pokédex
        </h1>

        {/* 🔍 Search */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border rounded-lg px-4 py-2 shadow focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <PokemonList pokemon={filteredPokemon} />

        <div className="mt-6 flex flex-col items-center gap-3">
          <Pagination
            prevPageUrl={prevPageUrl}
            goToNextPage={() => setCurrentPageUrl(nextPageUrl)}
            goToPrevPage={() => setCurrentPageUrl(prevPageUrl)}
            goToFirstPage={() =>
              setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
            }
            goToLastPage={() => {
              const lastOffset = (totalPages - 1) * limit;
              setCurrentPageUrl(
                `https://pokeapi.co/api/v2/pokemon?offset=${lastOffset}&limit=${limit}`
              );
            }}
          />

          <p className="text-gray-600 font-medium">
            Page {page} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
