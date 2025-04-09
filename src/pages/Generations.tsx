import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Generation {
    name: string;
    url: string;
}

const Generations = () => {
    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        const fetchGenerations = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/generation/");
                const data = await res.json();
                setGenerations(data.results);
            } catch (err) {
                console.error("Erro ao buscar gerações:", err);
            }
        };

        fetchGenerations();
    }, []);

    return (
        <section className="min-h-screen bg-white dark:bg-[#1a1a1a] px-4 py-6 mt-12">
            <header className="text-center text-3xl font-impact text-base-red mb-6">
                Gerações Pokémon
            </header>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
                {generations.map((generation, index) => {
                    const id = index + 1;

                    return (
                        <div
                            key={generation.name}
                            className="bg-base-red text-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-between hover:scale-[1.02] transition-transform"
                        >
                            <h2 className="text-xl md:text-2xl font-impact mb-2 text-center">
                                Geração {id}
                            </h2>

                            <p className="text-base font-navigation capitalize text-center">
                                {generation.name.replace("-", " ")}
                            </p>

                            <Link
                                to={`/generations/${id}`}
                                className="mt-4 px-4 py-2 bg-white text-base-red font-bold rounded-lg hover:bg-gray-100 transition"
                            >
                                Ver Pokémon
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Generations;
