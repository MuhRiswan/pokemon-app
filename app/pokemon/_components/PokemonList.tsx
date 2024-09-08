"use client";

import PokemonCard from "@/components/PokemonCard";
import { getPokemonByType } from "@/hooks/getPokemon";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  props: any[];
  selectedType: string;
}

export default function PokemonList({ props, selectedType }: Props) {
  const [pokemon, setPokemon] = useState<any[]>(props);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [inViewRef, inView] = useInView({
    threshold: 0,
  });

  // Function to simulate delay and load next page of Pokemon based on type
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const loadListPokemon = async () => {
    setLoading(true);
    try {
      await delay(2000); // Simulate 2 seconds delay
      const nextPage = page + 1;
      const pokemonData = await getPokemonByType(selectedType, nextPage);
      setPokemon((prev: any) => [...prev, ...pokemonData]);
      setPage(nextPage);
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("Network")) {
        // Handle network error
        alert("Koneksi internet terputus. Silakan coba lagi beberapa saat.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Use effect to load more Pokemon when inView is true
  useEffect(() => {
    if (inView) {
      loadListPokemon();
    }
  }, [inView]);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        {pokemon?.map((pokemon: any, index: number) => (
          // Combine index and name/url to ensure unique key
          <PokemonCard pokemon={pokemon} key={`${pokemon.name}-${index}`} />
        ))}
      </div>
      {pokemon && pokemon.length >= 24 && (
        <div className="flex justify-center items-center p-4" ref={inViewRef}>
          <RefreshCcw className="w-5 h-5 animate-spin" color="#000" />
        </div>
      )}
    </>
  );
}
