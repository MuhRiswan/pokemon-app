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
