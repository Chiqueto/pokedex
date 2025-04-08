import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";
import { typeColors } from "@/utils/TypeColors";


interface TypeEffectivenessProps {
    pokemon: Pokemon;
}



const getTypeDamageRelations = async (typeName: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    const data = await res.json();
    return data.damage_relations;
};

const calculateDamageRelations = async (types: string[]) => {
    const allTypes = [
        "normal", "fire", "water", "electric", "grass", "ice",
        "fighting", "poison", "ground", "flying", "psychic", "bug",
        "rock", "ghost", "dragon", "dark", "steel", "fairy"
    ];

    const multipliers: Record<string, number> = {};

    // Inicializa todos com 1x
    allTypes.forEach((type) => {
        multipliers[type] = 1;
    });

    for (const typeName of types) {
        const relations = await getTypeDamageRelations(typeName);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        relations.double_damage_from.forEach((t: any) => {
            multipliers[t.name] *= 2;
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        relations.half_damage_from.forEach((t: any) => {
            multipliers[t.name] *= 0.5;
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        relations.no_damage_from.forEach((t: any) => {
            multipliers[t.name] *= 0;
        });
    }

    return multipliers;
};

const TypeEffectiveness = ({ pokemon }: TypeEffectivenessProps) => {
    const [multipliers, setMultipliers] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchData = async () => {
            const types = pokemon.types.map((t) => t.type.name);
            const result = await calculateDamageRelations(types);
            setMultipliers(result);
        };

        fetchData();
    }, [pokemon]);

    return (
        <div className="grid grid-cols-3 gap-x-1 gap-y-2 my-4">
            {Object.entries(multipliers).map(([type, value]) => (
                <div key={type} className={`rounded-full px-2 py-2 text-white text-sm ${typeColors[type] || "bg-gray-500"}`}>
                    <p className="capitalize text-center font-body text-sm italic font-semibold"> {type} {value}x</p>
                </div>
            ))}
        </div>
    );
}

export default TypeEffectiveness;