import { useEffect, useState } from "react"
import { Pokemon } from "../types/Pokemon"
import Loading from "../components/Loading";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PokeCard from "@/components/PokeCard";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import HoverCardHeader from "@/components/HoverCardHeader";
import PokemonMenu from "@/components/PokemonMenu";
import EvolutiveChain from "@/components/EvolutiveChain";
import PokemonStats from "@/components/PokemonStats";
import TypeReferences from "@/components/TypeReferences";

type JsonResult = {
    name: string,
    url: string
}

const Pokedex = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [pokemonsFiltered, setPokemonsFiltered] = useState<Pokemon[]>([])
    const [pokeName, setPokeName] = useState<string>('')
    // const [errorMsg, setErrorMsg] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [offSet, setOffSet] = useState<number>(0)
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()


    function loadApi(append: boolean) {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=50`
        fetch(url)
            .then(response => response.json())
            .then(async (json) => {
                const pokemonsDetailed = await Promise.all(
                    json.results.map((result: JsonResult) =>
                        fetch(result.url).then(res => res.json())
                    )
                );
                setOffSet(prev => prev + 50);
                setPokemons(append ? [...pokemons, ...pokemonsDetailed] : pokemonsDetailed);
                setLoading(false);
                console.log("Pokémons atualizados:", pokemonsDetailed)
            })
            .catch(err => {
                console.error(err)
                // setErrorMsg("Erro ao buscar pokémon")
                setPokemons([])
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        loadApi(false)
    }, [])

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPokeName(event.target.value)
    }

    useEffect(() => {
        if (pokemons.length >= 1300) return;
        const timer = setTimeout(() => {
            loadApi(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [pokemons]);

    const handleSearch = async () => {
        if (pokeName === '') {
            setPokemonsFiltered([])
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            const data = await response.json();
            setPokemonsFiltered([data]);
        } catch (error) {
            console.error(error);
            setPokemonsFiltered([]);
        } finally {
            setLoading(false);
        }
    }


    return (

        <section className="flex flex-col h-[calc(100vh)] overflow-hidden text-center">
            <Drawer>

                <div className="mt-10 mx-2 flex flex-row justify-between items-center gap-3">
                    <Input
                        type="text"
                        className=" w-full flex-1 bg-gray-100 border-base-red border shadow-sm rounded-xl h-10 focus:outline-1 focus:outline-base-red px-2 text-lg shadow-black/25"
                        onChange={handleNameChange}
                    />
                    <Button
                        onClick={handleSearch}
                        className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12"
                    >
                        <SearchIcon className="w-full h-full" />
                    </Button>
                </div>
                <div className="text-center">
                    {loading && pokemons.length === 0 ? (
                        <Loading loading={loading} />
                    ) : (

                        <ScrollArea className="mx-2 my-2 flex-1 h-[calc(100vh-128px)]  ">
                            <ul className="mx-2 flex justify-center items-center ">
                                <DrawerTrigger className="text-center w-full space-y-4 mx-2 mr-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl">
                                    {pokemons && pokemonsFiltered.length === 0 ? (
                                        pokemons.map((pokemon: Pokemon) => (
                                            <PokeCard pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />
                                        ))) : pokemonsFiltered.length !== 0 ? (
                                            pokemonsFiltered.map((pokemon: Pokemon) => (
                                                <PokeCard pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />))
                                        ) : (<li className="col-span-3 md:col-span-6">Nenhum pokémon encontrado</li>)
                                    }
                                </DrawerTrigger>
                            </ul>
                            {selectedPokemon &&
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
                            }

                            {loading && <Loading loading color="red" size={100} />}
                        </ScrollArea>

                    )}
                </div>
            </Drawer >

        </section >

    )
}

export default Pokedex;


