"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";

interface Pokemon {
    name: string;
    url: string;
}

const Pokedex = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    const [offset, setOffset] = useState(0);

    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`)
            .then((response) => response.json())
            .then((data) => setPokemonList(data.results));
    }, [offset]);

    return (
        <div className='container mx-auto  px-4 py-10 sm:px-6 sm:py-24 '>
            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {pokemonList.map((pokemon) => (
                    <div
                        key={pokemon.name}
                        className='flex flex-col items-center justify-center bg-slate-200 p-6 rounded-md'
                    >
                        <Image
                            src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                            alt={pokemon.name}
                            width={200}
                            height={200}
                        />

                        <h2>{pokemon.name}</h2>

                        <button
                            onClick={() =>
                                router.push(
                                    `/${pathname?.split("/")[1]}/${
                                        pokemon.name
                                    }`
                                )
                            }
                            className='mt-4 px-6 py-1 bg-slate-400 text-white rounded-md'
                        >
                            Détails
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setOffset(offset + 50)}
                className='mt-6 bg-red-500 px-8 py-2 text-white rounded-md '
            >
                Suivant
            </button>
        </div>
    );
};

export default Pokedex;
