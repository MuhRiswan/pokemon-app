import PokemonList from "@/app/_components/PokemonList";
import { fetchPokemon } from "@/hooks/getPokemon";
import { Search } from "./_components/Search";

const Page = async ({ searchParams }: { searchParams?: any }) => {
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";

  const pokemonData = await fetchPokemon({ search });
  return (
    <div className="w-full mx-auto px-5 py-24 md:py-28 ">
      <Search search={search} />
      <div key={search}>
        <PokemonList search={search} props={pokemonData} />
      </div>
    </div>
  );
};

export default Page;
