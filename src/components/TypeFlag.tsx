import { Pokemon } from "@/types/Pokemon";
import { typeColors } from "@/utils/TypeColors";
interface TypeFlagProps {
    pokemon: Pokemon;
}



const TypeFlag = ({ pokemon }: TypeFlagProps) => {
    return (

        pokemon.types.map((type, index) => (
            <div
                key={index}
                className={`rounded-xl max-w-28 w-full text-center px-2 py-1 text-white text-xs mb-1 ${typeColors[type.type.name] || "bg-gray-500"}`}
            >
                <p className="capitalize font-body text-sm italic font-bold"> {type.type.name}</p>


            </div>
        ))

    );
};

export default TypeFlag;
