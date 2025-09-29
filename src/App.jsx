import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(currentPageUrl);
        setPokemon(res.data.results);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);

        
        const url = new URL(currentPageUrl);
        const offset = url.searchParams.get("offset") || 0;
        const limit = url.searchParams.get("limit") || 20;
        setPage(Math.floor(offset / limit) + 1);

       
        const count = res.data.count; // total pokemons
        setTotalPages(Math.ceil(count / limit));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function goToFirstPage() {
    setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
  }

  function goToLastPage() {
    const lastOffset = (totalPages - 1) * 20;
    setCurrentPageUrl(
      `https://pokeapi.co/api/v2/pokemon?offset=${lastOffset}&limit=20`
    );
  }

  
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Pokédex
        </h1>

        {/* 🔍 Search bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border rounded-lg px-4 py-2 shadow focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Array(6)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse h-32 rounded-xl"
                ></div>
              ))}
          </div>
        ) : (
          <PokemonList pokemon={filteredPokemon} />
        )}

        <div className="mt-6 flex flex-col items-center gap-3">
          <Pagination
            prevPageUrl={prevPageUrl}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
            goToFirstPage={goToFirstPage}
            goToLastPage={goToLastPage}
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
