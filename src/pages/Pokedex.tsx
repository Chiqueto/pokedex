import { useEffect, useState } from "react"
import { Pokemon } from "../types/Pokemon"
import Loading from "../components/Loading";
import { FilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type JsonResult = {
    name: string,
    url: string
}

const Pokedex = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [pokeName, setPokeName] = useState<string>('')  // Se necessário para buscas, mas aqui usamos o endpoint fixo
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function loadApi() {
        setLoading(true)
        // Usando endpoint fixo para listar os primeiros 20 pokémons
        const url = `https://pokeapi.co/api/v2/pokemon?limit=20`
        fetch(url)
            .then(response => response.json())
            .then(async (json) => {
                // Para cada item em json.results, busca os detalhes completos
                const pokemonsDetailed = await Promise.all(
                    json.results.map((result: JsonResult) =>
                        fetch(result.url).then(res => res.json())
                    )
                );
                setPokemons(pokemonsDetailed);
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
        loadApi()
    }, [])

    useEffect(() => {
        console.log("pokemons atualizado:", pokemons);
    }, [pokemons]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPokeName(event.target.value)
    }

    return (
        <section>
            <div className="mt-4 mx-2 flex flex-row justify-between items-center gap-3">
                <Input
                    type="text"
                    className="max-w-64 w-full bg-gray-100 border-base-red border shadow-sm rounded-xl h-10 focus:outline-1 focus:outline-base-red px-2 text-lg shadow-black/25"
                    onChange={handleNameChange}
                />
                <Button className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12">
                    <SearchIcon className="w-full h-full" />
                </Button>
                <Button className="bg-base-red border border-black p-2 rounded-xl flex items-center justify-center w-12 h-12">
                    <FilterIcon className="w-full h-full" />
                </Button>
            </div>
            <div>
                {loading ? (
                    <Loading loading={loading} />
                ) : (
                    pokemons && (
                        <ScrollArea>
                            <ul>
                                {pokemons.map((pokemon: Pokemon) => (
                                    <li key={pokemon.id} className="mx-2 w-full h-full">
                                        <a className="flex flex-row max-h-32 relative h-full items-center justify-center">
                                            <div className="bg-gray-base py-2 w-full px-4 flex flex-col justify-between">
                                                {/* Nome e Id */}
                                                <div className="flex flex-col items-start justify-center mb-3">
                                                    <p className="font-navigation text-base font-bold">{pokemon.name}</p>
                                                    <p className="font-body text-xs">#{pokemon.id}</p>
                                                </div>
                                                {/* Tipos */}
                                                <div className="flex flex-col items-start">
                                                    {pokemon.types.map((type, index) => (
                                                        <div key={index} className="bg-base-red rounded-xl max-w-28 w-full text-center px-2 py-1 text-white text-xs mb-1">
                                                            {type.type.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-base-red h-full w-full z-20 py-2">
                                                <div className="relative flex items-center justify-end mx-4">
                                                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="max-h-48 h-full z-30 mr-2" />
                                                    <img src="./Pokeball.svg" alt="Pokeball" className="absolute z-10" />
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    )
                )}
            </div>
        </section>
    )
}

export default Pokedex;
