import { useEffect, useState } from "react"
import { Pokemon } from "./types/Pokemon"



function App() {

  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pokeName, setPokeName] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  function loadApi() {
    if (!pokeName) {
      setErrorMsg("Nenhum pokémon encontrado")
      setPokemon(undefined)

      return
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setPokemon(json)
      })
      .catch(err => {
        console.log(err)
        setErrorMsg("Erro ao buscar pokémon")
        setPokemon(undefined)
        console.log(errorMsg)
      })
  }

  useEffect(() => {
  }, [errorMsg])


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokeName(event.target.value)
  }

  return (
    <div className="flex flex-col w-[100%] justify-center items-center">
      <header className="flex justify-center items-center text-2xl h-14 w-[100%] bg-amber-400 text-white">
        <strong>Pokemon API</strong>
      </header>

      <div className="flex flex-col justify-center items-center mt-4">
        <label className="text-lg font-bold" htmlFor="pokename">Busque pelo pokémon</label>
        <input type="text" value={pokeName} name="pokename" placeholder="Pikachu" onChange={handleNameChange} className="bg-amber-100 border border-black rounded-xl px-2 mt-2" />
        <button onClick={loadApi} className="bg-red-500 border border-black mt-2 cursor-pointer hover:bg-red-600 shadow  shadow-black text-white px-2 py-1 rounded-2xl">Buscar Pokemon</button>
      </div>

      {pokemon ? (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>Nome: {pokemon.name}</div>
          <div>Número: {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10} Kg</div>
          <div>Altura: {pokemon.height / 10}m</div>

        </div>
      ) : (
        <div>
          <h2>{errorMsg}</h2>
        </div>
      )}
    </div>


  )
}

export default App
