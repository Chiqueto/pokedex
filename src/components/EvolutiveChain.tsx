import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface EvolutiveChainProps {
    pokemon: Pokemon;
}

const EvolutiveChain = ({ pokemon }: EvolutiveChainProps) => {

    const [evolutiveChain, setEvolutiveChain] = useState<Pokemon[]>([]);

    const fetchEvolutiveChain = async () => {
        try {
            const response = await fetch(pokemon.species.url);
            const data = await response.json();
            const evolutionChainUrl = data.evolution_chain.url;
            const evolutionResponse = await fetch(evolutionChainUrl);
            const evolutionData = await evolutionResponse.json();

            // Função recursiva para coletar os nomes
            const extractEvolutionNames = (chain: any): string[] => {
                const names = [chain.species.name];
                chain.evolves_to.forEach((evo: any) => {
                    names.push(...extractEvolutionNames(evo));
                });
                return names;
            };

            const names = extractEvolutionNames(evolutionData.chain);

            const pokemonsData = await Promise.all(
                names.map(async (name) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    return await res.json();
                })
            );

            setEvolutiveChain(pokemonsData);
        } catch (error) {
            console.error("Erro ao buscar cadeia evolutiva:", error);
        }
    };

    useEffect(() => {
        fetchEvolutiveChain();
    }, [pokemon.species.url]);

    if (evolutiveChain.length === 0) {
        return <div className="text-gray-700">Carregando cadeia evolutiva...</div>;
    }

    return (
        <ScrollArea className="overflow-x-auto ">
            <div className="flex justify-between gap-6 items-center mx-auto w-max py-4">
                {evolutiveChain.map((poke, index) => (
                    <div key={poke.id} className="flex items-center justify-center gap-2">
                        <div className="text-center">
                            <div className="relative w-20 h-20 mx-auto">
                                <img
                                    src={poke.sprites.other["official-artwork"].front_default}
                                    alt={poke.name}
                                    className="w-full h-full"
                                />
                            </div>
                            <p className="font-bold capitalize">{poke.name}</p>
                            <p className="text-sm text-gray-500">Nº {poke.id}</p>
                        </div>
                        {index < evolutiveChain.length - 1 && (
                            <span className="text-2xl text-gray-400">→</span>
                        )}
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

    );
}

export default EvolutiveChain;