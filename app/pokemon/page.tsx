import {
  getPokemonByTypeAndAbility,
  getPokemonTypes,
  getPokemonAbilities,
} from "@/hooks/getPokemon";
import PokemonList from "./_components/PokemonList";
import Filter from "./_components/Filter";

const Page = async ({ searchParams }: { searchParams?: any }) => {
  const selectedType = searchParams?.type || "normal"; // Default to normal type
  const selectedAbility = searchParams?.ability || ""; // Default to all abilities

  const pokemonData = await getPokemonByTypeAndAbility(
    selectedType,
    selectedAbility
  );
  const types = await getPokemonTypes();
  const abilities = await getPokemonAbilities();

  return (
    <div className="w-full mx-auto px-5 py-24 md:py-28">
      <Filter
        types={types}
        abilities={abilities}
        selectedType={selectedType}
        selectedAbility={selectedAbility}
      />
      <div key={`${selectedType}-${selectedAbility}`}>
        <PokemonList props={pokemonData} selectedType={selectedType} />
      </div>
    </div>
  );
};

export default Page;
