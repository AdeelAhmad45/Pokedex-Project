import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import axios from 'axios'
import Pokemon from '../Pokemon/Pokemon'

function PokemonList() {

  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState("")
  const [previousUrl, setPreviousUrl] = useState("")


  async function downloadPokemon(){
    setIsLoading(true)
    const response = await axios.get(pokedexUrl)
    const pokemonResults = response.data.results
    console.log(response.data);
    setNextUrl(response.data.next)
    setPreviousUrl(response.data.previous)
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
  },[pokedexUrl])
  return (
    <div className='pokemon-list-wrapper'>
      <div>PokemonList</div>
      <div className='pokemon-wrapper'>
      {(isLoading) ? " Loading.." : 
      pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
      }
      </div>
      <div className='controls'>
        <button disabled={previousUrl == undefined } onClick={() => setPokedexUrl(previousUrl)}>Prev</button>
        <button disabled={nextUrl == undefined } onClick={() => setPokedexUrl(nextUrl)}>Next</button>
      </div>
      </div>
  )
}

export default PokemonList