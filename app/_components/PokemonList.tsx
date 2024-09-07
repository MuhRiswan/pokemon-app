"use client";
import { fetchPokemon } from "@/hooks/getPokemon";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PokemonCard from "./PokemonCard";
interface Props {
  search: string;
  props: any[];
}
export default function PokemonList({ search, props }: Props) {
  const [pokemon, setPokemon] = useState<any[]>(props);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [inViewRef, inView] = useInView({
    threshold: 0,
  });
  // tolong buatkan delay load
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const loadListPokemon = async () => {
    setLoading(true);
    await delay(1000);
    const nextPage = page + 1;
    const pokemonData = await fetchPokemon({ search, page: nextPage });
    setPokemon((prev: any) => [...prev, ...pokemonData]);
    setPage(nextPage);
    setLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadListPokemon();
    }
  }, [inView]);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4 items-center">
        {pokemon?.map((pokemon: any) => (
          <PokemonCard pokemon={pokemon} key={pokemon.url} />
        ))}
      </div>
      {pokemon && pokemon?.length >= 24 && (
        <div className="flex justify-center items-center p-4" ref={inViewRef}>
          <RefreshCcw className="w-5 h-5 animate-spin" color="#000" />
        </div>
      )}
    </>
  );
}
