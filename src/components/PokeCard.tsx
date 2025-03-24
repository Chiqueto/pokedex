import { Pokemon } from "@/types/Pokemon";

interface PokeCardProps {
    pokemon: Pokemon;
}

const PokeCard = ({ pokemon }: PokeCardProps) => {
    return (
        <li key={pokemon.id} className=" w-full h-full ">
            <div className="flex flex-row max-h-28 relative h-full items-center  justify-center">
                <div className="bg-gray-base w-full max-h-28 h-full py-0.5 px-4 flex flex-col justify-between rounded-l-xl">
                    {/* Nome e Id */}
                    <div className="flex flex-col items-start justify-center mb-3">
                        <p className="font-navigation text-base font-bold">{pokemon.name}</p>
                        <p className="font-body text-xs">#{pokemon.id}</p>
                    </div>
                    {/* Tipos */}
                    <div className="h-14 flex flex-col justify-end items-start ">
                        {pokemon.types.map((type, index) => (
                            <div key={index} className="bg-base-red rounded-xl  max-w-28 w-full text-center px-2 py-1 text-white text-xs mb-1">
                                {type.type.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-base-red h-full w-full z-20 max-h-28 rounded-r-xl">
                    <div className="relative flex items-center justify-end mx-4">
                        <img src={pokemon.sprites.other["official-artwork"].front_default ? pokemon.sprites.other["official-artwork"].front_default : pokemon.sprites.front_default} alt={pokemon.name} className="max-h-32  h-full z-30 mr-2 object-fill" />
                        <img src="./Pokeball.svg" alt="Pokeball" className="absolute z-10" />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default PokeCard;