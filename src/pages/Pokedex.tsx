import { useEffect, useState } from "react"
import { Pokemon } from "../types/Pokemon"
import Loading from "../components/Loading";
import { FilterIcon, SearchIcon } from "lucide-react";
import Button from "../components/Button";

const Pokedex = () => {
    const [pokemon, setPokemon] = useState<Pokemon>()
    const [pokeName, setPokeName] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function loadApi() {
        setLoading(true)
        if (!pokeName) {
            setErrorMsg("Nenhum pokémon encontrado")
            setPokemon(undefined)
            setLoading(false)

            return
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setPokemon(json)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setErrorMsg("Erro ao buscar pokémon")
                setPokemon(undefined)
                setLoading(false)
                console.log(errorMsg)
            })
    }

    useEffect(() => {
    }, [errorMsg])


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPokeName(event.target.value)
    }

    return (
        <div className="mt-4 mx-2 flex flex-row justify-between items-center gap-3">
            <input type="text" className="max-w-64 w-full bg-gray-100 border-base-red border shadow-sm rounded-xl h-10 focus:outline-1 focus:outline-base-red px-2 text-lg shadow-black/25" />
            <Button />
            <Button />

        </div>

        // <div className="flex flex-col w-[100%] justify-center items-center">


        //     <div className="flex flex-col justify-center items-center mt-4 bg-red-500 px-4 py-2 text-white">
        //         <div className="flex flex-col justify-center items-center">
        //             <label className="text-lg font-bold" htmlFor="pokename">Busque pelo pokémon</label>
        //             <div className="flex flex-row gap-2">
        //                 <input
        //                     type="text"
        //                     value={pokeName}
        //                     name="pokename"
        //                     placeholder="Pikachu"
        //                     onChange={handleNameChange}
        //                     className="bg-amber-100 border text-black border-black rounded-xl px-2 mt-2 focus:outline-1 focus:outline-amber-300 shadow-none"
        //                 />
        //                 <button onClick={loadApi} className="bg-red-500 border border-white mt-2 cursor-pointer hover:bg-red-600 shadow  shadow-black text-white px-2 py-1 rounded-2xl">Buscar</button>
        //             </div>
        //         </div>
        //         {loading ? (
        //             <Loading loading={loading} />
        //         ) : (
        //             pokemon ? (
        //                 <div className="w-full relative flex flex-col justify-center items-center p-4 rounded-xl">
        //                     <div className="absolute w-full h-full bg-white opacity-50 backdrop-blur-lg"></div>
        //                     <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        //                     <div>Nome: {pokemon.name}</div>
        //                     <div>Número: {pokemon.id}</div>
        //                     <div>Peso: {pokemon.weight / 10} Kg</div>
        //                     <div>Altura: {pokemon.height / 10}m</div>
        //                 </div>
        //             ) : (
        //                 <div>
        //                     <h2>{errorMsg}</h2>
        //                 </div>
        //             )
        //         )}
        //     </div>

        // </div>


    )
}

export default Pokedex;