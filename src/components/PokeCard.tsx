import { Pokemon } from "@/types/Pokemon";
import TypeFlag from "./TypeFlag";

interface PokeCardProps {
    pokemon: Pokemon;
    setSelectedPokemon: (pokemon: Pokemon) => void;
}


const PokeCard = ({ pokemon, setSelectedPokemon }: PokeCardProps) => {
    return (
        <li onClick={() => { setSelectedPokemon(pokemon) }} key={pokemon.id} className="w-full h-full cursor-pointer">
            <div className="flex flex-row max-h-28 relative h-full items-center justify-center group">
                {/* Lado esquerdo - Nome e Tipos */}
                <div className="relative overflow-hidden w-full max-h-28 h-full py-0.5 px-4 flex flex-col justify-between rounded-l-xl bg-gray-base transition-colors duration-600 group-hover:text-white">
                    {/* Pseudo-elemento para o efeito de transição */}
                    <div className="absolute inset-0 bg-base-red scale-x-0 origin-right transition-transform duration-600 group-hover:scale-x-100"></div>

                    {/* Conteúdo do card */}
                    <div className="relative z-10 duration-500 group-hover:text-white">
                        <div className="flex flex-col items-start justify-center mb-3">
                            <p className="font-navigation text-base font-bold truncate max-w-[140px]">
                                {pokemon.name}
                            </p>
                            <p className="font-body text-xs">
                                #{pokemon.id}
                            </p>
                        </div>
                        {/* Tipos */}
                        <div className="h-14 flex flex-col justify-end items-start">
                            <TypeFlag pokemon={pokemon} />
                        </div>
                    </div>
                </div>

                {/* Lado direito - Imagem */}
                <div className="bg-base-red w-full z-20 h-28 rounded-r-xl">
                    <div className="relative flex items-center justify-end mx-4 h-full max-h-28 overflow-visible">
                        <img
                            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="max-h-32 h-full z-30 mr-2 object-fill group-hover:scale-150 transition-transform duration-600"
                        />
                        <img src="./Pokeball.svg" alt="Pokeball" className="absolute z-10" />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default PokeCard;
