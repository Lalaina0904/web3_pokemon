import Image from "next/image";

import Link from "next/link";

interface Pokemon {
    name: string;
    url: string;
}

async function getData() {
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50&offset"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const data = await getData();

    return (
        <main className='container mx-auto  px-4 sm:px-6 sm:py-24 '>
            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {data.results.map((pokemon: Pokemon) => (
                    <div className='bg-slate-200 p-6 rounded-md'>
                        <div className='flex justify-center'>
                            <Image
                                src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                                alt={pokemon.name}
                                width={200}
                                height={200}
                            />
                        </div>

                        <div key={pokemon.name} className='text-center mt-4'>
                            <h2> {pokemon.name}</h2>
                            {/* // details sans utiliser le router qui redirige vers la page de détails /server/[id] */}
                            <div className='mt-4'>
                                <Link
                                    href={`/server/${pokemon.name}`}
                                    className='border border-slate-400 px-6 py-1 rounded-md'
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
