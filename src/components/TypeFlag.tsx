import { Pokemon } from "@/types/Pokemon";

interface TypeFlagProps {
    pokemon: Pokemon;
}

// Mapeamento de cores por tipo de Pokémon
const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    ice: "bg-cyan-300",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-stone-500",
    ghost: "bg-indigo-700",
    dragon: "bg-indigo-900",
    dark: "bg-gray-800",
    steel: "bg-gray-600",
    fairy: "bg-pink-300",
};

const TypeFlag = ({ pokemon }: TypeFlagProps) => {
    return (

        pokemon.types.map((type, index) => (
            <div
                key={index}
                className={`rounded-xl max-w-28 w-full text-center px-2 py-1 text-white text-xs mb-1 ${typeColors[type.type.name] || "bg-gray-500"}`}
            >
                {type.type.name}
            </div>
        ))

    );
};

export default TypeFlag;
