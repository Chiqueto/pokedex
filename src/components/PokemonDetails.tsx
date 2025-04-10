import EvolutiveChain from "./EvolutiveChain";
import HoverCardHeader from "./HoverCardHeader";
import PokemonMenu from "./PokemonMenu";
import PokemonStats from "./PokemonStats";
import TypeReferences from "./TypeReferences";
import { DrawerContent, DrawerHeader } from "./ui/drawer";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Pokemon } from "@/types/Pokemon";


interface PokemonDetailsProps {
    selectedPokemon: Pokemon;
}

const PokemonDetails = ({ selectedPokemon }: PokemonDetailsProps) => {
    return (
        < DrawerContent className="mx-auto w-full bg-base-red ">
            <div className="mx-auto w-full  bg-white ">
                <DrawerHeader className="p-0 rounded-3xl ">
                    <HoverCardHeader pokemon={selectedPokemon} />
                </DrawerHeader>
                <ScrollArea className="p-4 pb-10 bg-white h-72 overflow-y-auto ">
                    {/* EVOLUÇÃO */}
                    <PokemonMenu title="Cadeia Evolutiva">
                        <EvolutiveChain pokemon={selectedPokemon} />
                    </PokemonMenu>
                    {/* TIPAGENS */}
                    <PokemonMenu title="Fraquezas & Resistências">
                        <TypeReferences pokemon={selectedPokemon} />
                    </PokemonMenu>
                    {/* STATUS */}
                    <PokemonMenu title="Estatísticas">
                        <PokemonStats selectedPokemon={selectedPokemon} />
                    </PokemonMenu>
                    <ScrollBar
                        orientation="vertical"
                        className="bg-base-red/80 w-2 rounded-xl transition-all duration-300 hover:w-3"
                    />
                </ScrollArea>
            </div>
        </DrawerContent>
    );
}

export default PokemonDetails;