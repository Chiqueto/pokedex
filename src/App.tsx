import { useEffect, useState } from "react"
import { Pokemon } from "./types/Pokemon"



function App() {

  const [pokemon, setPokemon] = useState<Pokemon>()

  function loadApi() {
    const url = 'https://pokeapi.co/api/v2/pokemon/ditto'
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setPokemon(json)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {

    loadApi()
  }, [])


  return (
    <div className="flex flex-col w-[100%] justify-center items-center">
      <header className="flex justify-center items-center text-2xl h-14 w-[100%] bg-amber-400 text-white">
        <strong>Pokemon API</strong>
      </header>

      {pokemon && (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>Nome: {pokemon.name}</div>
          <div>Número: {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10} Kg</div>
          <div>Altura: {pokemon.height / 10}m</div>
        </div>
      )}
    </div>


  )
}

export default App
