import { useEffect, useState } from "react"
import { Pokemon } from "../types/Pokemon"
import Loading from "../components/Loading";
import { FilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PokeCard from "@/components/PokeCard";

type JsonResult = {
    name: string,
    url: string
}

const Pokedex = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [pokemonsFiltered, setPokemonsFiltered] = useState<Pokemon[]>([])
    const [pokeName, setPokeName] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [offSet, setOffSet] = useState<number>(0)


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
                setErrorMsg("Erro ao buscar pokémon")
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
        if (pokemons.length > 0 && pokemons.length < 1027) { // Evita loop infinito
            setLoading(true)
            const interval = setInterval(() => {
                setOffSet(offSet + 50);
                loadApi(true);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [pokemons])

    const searchPokemon = () => {
        if (pokeName === '') {
            setPokemonsFiltered([])
            return
        } else {
            pokemons.forEach(pokemon => {
                if (pokemon.name === pokeName) {
                    setPokemonsFiltered([pokemon])
                    return
                } else {
                    setLoading(true)
                    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
                    fetch(url)
                        .then(response => response.json())
                        .then(json => {
                            setPokemonsFiltered([json])
                            setLoading(false)
                        })
                        .catch(err => {
                            console.error(err)
                            setErrorMsg("Erro ao buscar pokémon")
                            setPokemonsFiltered([])
                            setLoading(false)
                        })
                }
            })
        }

    }

    return (
        <section>
            <div className="mt-4 mx-2 flex flex-row justify-between items-center gap-3">
                <Input
                    type="text"
                    className="max-w-64 w-full bg-gray-100 border-base-red border shadow-sm rounded-xl h-10 focus:outline-1 focus:outline-base-red px-2 text-lg shadow-black/25"
                    onChange={handleNameChange}
                />
                <Button onClick={searchPokemon} className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12">
                    <SearchIcon className="w-full h-full" />
                </Button>
                <Button className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12">
                    <FilterIcon className="w-full h-full" />
                </Button>
            </div>
            <div className="text-center">
                {loading && pokemons.length === 0 ? (
                    <Loading loading={loading} />
                ) : (
                    pokemons && pokemonsFiltered.length === 0 && (
                        <ScrollArea className="mx-2 my-2 h-[520px]">
                            <ul className="space-y-4 mx-2 mr-4">
                                {pokemons.map((pokemon: Pokemon) => (
                                    <PokeCard pokemon={pokemon} />
                                ))}
                            </ul>
                            {loading && <Loading loading color="red" size={100} />}
                        </ScrollArea>
                    )
                )}
            </div>
        </section>
    )
}

export default Pokedex;
