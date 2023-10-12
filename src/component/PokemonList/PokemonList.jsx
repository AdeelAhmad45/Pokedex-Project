import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import axios from 'axios'
import Pokemon from '../Pokemon/Pokemon'

const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/";
function PokemonList() {

  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function downloadPokemon(){
    const response = await axios.get(POKEDEX_URL)
    const pokemonResults = response.data.results
    console.log(response.data);
    const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
    // console.log(pokemonResultPromise);
    const pokemonData = await axios.all(pokemonResultPromise)
    console.log(pokemonData);
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types
        }
    })
    console.log(res);
    setPokemonList(res)
    setIsLoading(false)
  }
  useEffect(() => {
    downloadPokemon();
  },[])
  return (
    <div className='pokemon-list-wrapper'>
      <div>PokemonList</div>
      <div className='pokemon-wrapper'>
      {(isLoading) ? " Loading.." : 
      pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
      }
      </div>
      <div className='controls'>
        <button>Prev</button>
        <button>Next</button>
      </div>
      </div>
  )
}

export default PokemonList