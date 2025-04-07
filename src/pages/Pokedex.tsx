import { useEffect, useState } from "react"
import { Pokemon } from "../types/Pokemon"
import Loading from "../components/Loading";
import { FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PokeCard from "@/components/PokeCard";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import HoverCardHeader from "@/components/HoverCardHeader";
import PokemonMenu from "@/components/PokemonMenu";
import EvolutiveChain from "@/components/EvolutiveChain";
// import HoverCard from "@/components/HoverCard";

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
                setOffSet(offSet + 50)
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
        if (pokemons.length > 0 && pokemons.length < 1300) { // Evita loop infinito
            setLoading(true)
            const interval = setInterval(() => {
                setOffSet(offSet + 50);
                loadApi(true);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [pokemons])

    useEffect(() => {
        if (pokeName === '') {
            setPokemonsFiltered([])
        } else {
            setPokemonsFiltered(pokemons.filter(pokemon => pokemon.name.includes(pokeName)))
        }
    }, [pokeName])



    return (

        <section className="relative">
            <Drawer >

                <div className="mt-4 mx-2 flex flex-row justify-between items-center gap-3">
                    <Input
                        type="text"
                        className=" w-full flex-1 bg-gray-100 border-base-red border shadow-sm rounded-xl h-10 focus:outline-1 focus:outline-base-red px-2 text-lg shadow-black/25"
                        onChange={handleNameChange}
                    />
                    <Button className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12">
                        <FilterIcon className="w-full h-full" />
                    </Button>
                </div>
                <div className="text-center ">
                    {loading && pokemons.length === 0 ? (
                        <Loading loading={loading} />
                    ) : (

                        <ScrollArea className="mx-2 my-2 h-[520px]">
                            <ul className="">
                                <DrawerTrigger className="w-full space-y-4 mx-2 mr-4">
                                    {pokemons && pokeName === '' ? (
                                        pokemons.map((pokemon: Pokemon) => (
                                            <PokeCard pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />
                                        ))) : pokemonsFiltered.length !== 0 ? (
                                            pokemonsFiltered.map((pokemon: Pokemon) => (
                                                <PokeCard pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />))
                                        ) : (<li>Nenhum pokémon encontrado</li>)
                                    }
                                </DrawerTrigger>
                            </ul>
                            {selectedPokemon &&
                                < DrawerContent className="mx-auto w-full bg-base-red">
                                    <div className="mx-auto w-full  bg-white">
                                        <DrawerHeader className="p-0 rounded-3xl">
                                            <HoverCardHeader pokemon={selectedPokemon} />
                                        </DrawerHeader>
                                        <ScrollArea className="p-4 bg-white">
                                            {/* EVOLUÇÃO */}
                                            <PokemonMenu title="Linha Evolutiva">
                                                <EvolutiveChain pokemon={selectedPokemon} />
                                            </PokemonMenu>
                                            {/* STATUS */}
                                            <PokemonMenu title="Status">
                                                <div className="flex flex-col gap-2">
                                                    {selectedPokemon.stats.map((stat) => (
                                                        <div key={stat.stat.name} className="flex justify-between items-center">
                                                            <span className="text-gray-700">{stat.stat.name}</span>
                                                            <span className="text-gray-700">{stat.base_stat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </PokemonMenu>
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


