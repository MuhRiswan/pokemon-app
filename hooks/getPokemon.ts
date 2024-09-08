"use server";

import axios from "axios";

export async function getPokemon({
  query,
  page = 1,
  limit = 1000,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
    (page - 1) * 24
  }`;

  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    let results = data.results;

    results = results.sort((a: any, b: any) => a.name.localeCompare(b.name));

    if (query) {
      const filteredData = results.filter((pokemon: any) =>
        pokemonNameStartWithQuery(pokemon.name, query.toLocaleLowerCase())
      );
      return filteredData.slice(0, 24);
    } else {
      return results.slice(0, 24);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

const pokemonNameStartWithQuery = (name: string, query: string) => {
  return name.toLocaleLowerCase().startsWith(query);
};

export async function fetchPokemon({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string | undefined;
}) {
  try {
    const pokemonData = await getPokemon({ query: search, page });
    return pokemonData;
  } catch (error) {
    console.log(error);
  }
}

// Fetch Pokemon types
export async function getPokemonTypes() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const data = await response.data;
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch Pokemon data with filter by type
export async function getPokemonByType(type: string, page = 1) {
  const limit = 24;
  const offset = (page - 1) * limit;
  let apiUrl = `https://pokeapi.co/api/v2/type/${type}`;

  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    const filteredPokemon = data.pokemon.map((p: any) => p.pokemon);
    return filteredPokemon.slice(offset, offset + limit);
  } catch (error) {
    console.error(error);
    return [];
  }
}
// Fetch Pokemon abilities
export async function getPokemonAbilities() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/ability");
    const data = await response.data;
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch Pokemon data with filter by type and ability
// Fetch Pokemon data with filter by type and ability with pagination support (for infinite scroll)
export async function getPokemonByTypeAndAbility(
  type: string,
  ability: string,
  page = 1
) {
  const limit = 24; // Max 24 Pokemon per page
  const offset = (page - 1) * limit; // Offset for pagination

  try {
    // Fetch Pokemon by type
    const typeResponse = await axios.get(
      `https://pokeapi.co/api/v2/type/${type}`
    );
    const typeData = await typeResponse.data;
    let filteredPokemon = typeData.pokemon.map((p: any) => p.pokemon);

    // If ability is selected, filter Pokemon by ability
    if (ability) {
      const abilityResponse = await axios.get(
        `https://pokeapi.co/api/v2/ability/${ability}`
      );
      const abilityData = await abilityResponse.data;
      const pokemonWithAbility = abilityData.pokemon.map(
        (p: any) => p.pokemon.name
      );

      // Intersect both type and ability filtered results
      filteredPokemon = filteredPokemon.filter((p: any) =>
        pokemonWithAbility.includes(p.name)
      );
    }

    // Paginate the results using offset and limit
    return filteredPokemon.slice(offset, offset + limit);
  } catch (error) {
    console.error(error);
    return [];
  }
}
