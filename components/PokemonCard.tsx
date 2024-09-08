import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Definisikan tipe untuk data Pokemon
interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

const PokemonCard = ({ pokemon }: { pokemon: { url: string } }) => {
  const [data, setData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data: PokemonData = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemon.url]);
  return (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-5 w-full md:w-full max-w-xs  md:max-w-3xl mx-auto border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="w-full md:w-1/3 bg-gray-100 grid place-items-center">
        {isLoading ? (
          <div className="w-40 h-full md:w-28 bg-gray-200 animate-pulse"></div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
                width={200}
                height={200}
                alt={`Pokemon ${data?.name}`}
                className="rounded-xl cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:max-w-[425px] md:max-w-[640px] rounded-xl">
              <DialogHeader>
                <DialogTitle className="capitalize">
                  Pokemon {data?.name}
                </DialogTitle>
                <DialogDescription>
                  {data
                    ? `Kenalan dengan ${
                        data.name
                      }, sebuah Pokemon tipe ${data.types
                        .map(({ type }) => type.name)
                        .join(", ")}. Dengan tinggi ${
                        data.height / 10
                      } meter dan berat ${data.weight / 10} kg, ${
                        data.name
                      } dikenal karena kemampuan unik dan karakteristik yang menarik.`
                    : null}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/3 grid place-items-center">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
                    width={160}
                    height={160}
                    alt={`Pokemon ${data?.name}`}
                    className="rounded-xl"
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col space-y-4 p-4">
                  <h3 className="text-xl font-bold capitalize">{data?.name}</h3>
                  <p className="text-gray-700 text-sm">
                    <strong>Height:</strong>{" "}
                    {data ? `${data.height / 10} m` : "-"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Weight:</strong>{" "}
                    {data ? `${data.weight / 10} kg` : "-"}
                  </p>
                  <div className="flex flex-wrap gap-x-2 mt-2">
                    {data?.types.map(({ type }, index) => (
                      <span
                        key={`${type.name}-${index}`}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full capitalize"
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2">
                    {`Explore more about ${data?.name} in the Pokémon world!`}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Info Section */}
      <div className="w-full md:w-2/3 bg-white flex flex-col space-y-4 p-3">
        {/* Pokemon Name */}
        <h3 className="font-black text-gray-800 md:text-2xl text-xl capitalize">
          {data?.name}
        </h3>

        {/* Type */}
        <div className="flex flex-wrap gap-x-2">
          {!isLoading &&
            data &&
            data.types.map(({ type }, index) => (
              <span
                key={`${type.name}-${index}`}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full capitalize"
              >
                {type.name}
              </span>
            ))}
        </div>

        {/* Stats */}
        <p className="text-gray-600">
          <strong>Height:</strong> {data?.height} m
        </p>
        <p className="text-gray-600">
          <strong>Weight:</strong> {data?.weight} kg
        </p>

        {/* Rating/Reviews */}
        {/* <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-gray-600 font-bold text-sm ml-2">
            4.9 <span className="text-gray-500">(200 reviews)</span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default PokemonCard;
