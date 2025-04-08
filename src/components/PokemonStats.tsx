import { Pokemon } from "@/types/Pokemon";

interface PokemonStatusProps {
    selectedPokemon: Pokemon
}

const PokemonStats = ({ selectedPokemon }: PokemonStatusProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {selectedPokemon.stats.map((stat) => {
                const name = stat.stat.name;
                const base = stat.base_stat;

                let min = 0;
                let max = 0;

                if (name.toLowerCase() === "hp") {
                    min = base * 2 + 110;
                    max = min;
                } else {
                    min = Math.floor((base * 2 + 5) * 0.9);
                    max = Math.floor((base * 2 + 5) * 1.1);
                }

                const percentage = Math.min((base / 200) * 100, 100);

                const getColor = () => {
                    if (percentage <= 40) return "bg-red-400";
                    if (percentage <= 60) return "bg-yellow-400";
                    if (percentage <= 80) return "bg-lime-400";
                    return "bg-green-500";
                };

                return (
                    <div key={name} className="flex flex-col">
                        <div className="flex justify-between items-center text-sm text-gray-800 font-semibold">
                            <span className="capitalize">{name}</span>
                            <span className="text-gray-700">{base}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                            <div
                                className={`h-2 rounded ${getColor()}`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <div className="flex justify-end text-xs text-gray-500 mt-1">
                            <span className="mr-4">Min: {min}</span>
                            <span>Max: {max}</span>
                        </div>
                    </div>
                );
            })}
            <div className="text-right mt-4 font-bold text-gray-800">
                Total: {selectedPokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)}
            </div>
        </div>
    );
}

export default PokemonStats;

