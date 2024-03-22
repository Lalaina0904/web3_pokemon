import React from "react";

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

interface PokemonType {
    type: {
        name: string;
    };
}

async function getData(id: string): Promise<PokemonDetails> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page({
    params: { id },
}: {
    params: {
        id: string;
    };
}) {
    const data = await getData(id);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <main className='flex justify-center items-center h-screen'>
            <div className='bg-slate-200 p-6 rounded-md w-[400px]'>
                <div className='flex justify-center'>
                    <Image
                        src={data.sprites.front_default}
                        alt={data.name}
                        width={200}
                        height={200}
                    />
                </div>
                <div>
                    <h2 className='text-center underline'>{data.name}</h2>
                    <p>Taille: {data.height}</p>
                    <p>Poids: {data.weight}</p>
                    <p>
                        Types:{" "}
                        {data.types
                            .map((type: PokemonType) => type.type.name)
                            .join(", ")}
                    </p>
                    <p>Numéro: {data.order}</p>
                </div>
            </div>
        </main>
    );
}
