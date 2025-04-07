import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // ou use ícones que quiser

interface PokemonMenuProps {
    title: string;
    children: React.ReactNode;
}

const PokemonMenu = ({ title, children }: PokemonMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-300  ">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-800 bg-gradient-to-b from-[white] to-[#EBEBEB] hover:bg-gradient-to-b hover:from-[white] hover:to-[#dfdfdf]"
            >
                <span>{title}</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && <div className="w-full ">{children}</div>}
        </div>
    );
};

export default PokemonMenu;