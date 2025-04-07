import { Pokemon } from "@/types/Pokemon";
import { DrawerDescription, DrawerTitle } from "./ui/drawer";
import TypeFlag from "./TypeFlag";

interface HoverCardProps {
    pokemon: Pokemon
}

const HoverCardHeader = ({ pokemon }: HoverCardProps) => {
    return (
        <div className="flex flex-col bg-gradient-to-b from-base-red to-[#A43737] rounded-b-3xl">
            {/* Header */}
            <div className="flex flex-col py-4 ">
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
                <div className="bg-white rounded-xl mx-8 flex mt-4 justify-between text-center items-stretch px-2 shadow-md">
                    {/* Peso */}
                    <div className="flex-1 flex flex-col justify-between px-4">
                        <h3 className="text-black text-lg font-semibold">Peso</h3>
                        <div className="flex-1 flex items-center justify-center">
                            <p className="font-body text-sm text-gray-700">{pokemon.weight / 10} Kg</p>
                        </div>
                    </div>

                    {/* Altura */}
                    <div className="flex-1 flex flex-col justify-between border-x border-black px-1">
                        <h3 className="text-black text-lg font-semibold">Altura</h3>
                        <div className="flex-1 flex items-center justify-center">
                            <p className="font-body text-sm text-gray-700">{pokemon.height / 10} m</p>
                        </div>
                    </div>

                    {/* Habilidades */}
                    <div className="flex-1 flex flex-col justify-between px-4">
                        <h3 className="text-black text-lg font-semibold">Habilidades</h3>
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
                            {pokemon.abilities.map((ability) => (
                                <p key={ability.ability.name} className="font-body text-sm text-gray-700">
                                    {ability.ability.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default HoverCardHeader;