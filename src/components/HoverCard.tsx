import { Pokemon } from "@/types/Pokemon";
import { DrawerDescription, DrawerTitle } from "./ui/drawer";
import TypeFlag from "./TypeFlag";

interface HoverCardProps {
    pokemon: Pokemon
}

const HoverCard = ({ pokemon }: HoverCardProps) => {
    return (
        <div className="flex flex-col ">
            {/* Header */}
            <div className="flex flex-col">
                <div className="flex w-full flex-row items-center justify-between mx-4 font-navigation">
                    <div className="flex flex-col items-baseline justify-center gap-4">
                        <div className="flex flex-row justify-center items-center gap-4">
                            <DrawerTitle className="text-white text-2xl">{pokemon.name}</DrawerTitle>
                            <DrawerDescription className="text-white opacity-70 text-base">#{pokemon.id}</DrawerDescription>
                        </div>
                        <div className="h-14 flex w-full flex-col justify-end items-start">
                            <TypeFlag pokemon={pokemon} />
                        </div>
                    </div>
                    <div className="relative flex items-center justify-end mr-8 h-full max-h-28 overflow-visible">
                        <img
                            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="max-h-32 h-full z-30 mr-2 object-fill group-hover:scale-150 transition-transform duration-600"
                        />
                        <img src="./Pokeball.svg" alt="Pokeball" className="absolute z-10" />
                    </div>
                </div>
                <div className="bg-white rounded-xl"><div>Peso</div><div>Altura</div><div>Habilidades</div></div>
            </div>
        </div>
    );
}

export default HoverCard;