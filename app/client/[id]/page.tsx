"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Image from "next/image";

interface PokemonDetails {
    sprites: {
        front_default: string;
    };
    name: string;
    height: number;
    weight: number;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    order: number;
}

const PokemonDetailsPage = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((response) => response.json())
                .then((data) => setPokemon(data));
        }
    }, [id]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-slate-200 p-6 rounded-md w-[400px]'>
                <div className='flex justify-center'>
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={150}
                        height={150}
                    />
                </div>

                <h2 className='text-center mb-4 underline'>{pokemon.name}</h2>
                <p>Taille: {pokemon.height}</p>
                <p>Poids: {pokemon.weight}</p>
                <p>
                    Types:{" "}
                    {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
                <p>Numéro: {pokemon.order}</p>
            </div>
        </div>
    );
};

export default PokemonDetailsPage;
