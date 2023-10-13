import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import axios from 'axios'
import Pokemon from '../Pokemon/Pokemon'

function PokemonList() {

  // const [pokemonList, setPokemonList] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  // const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  // const [nextUrl, setNextUrl] = useState("")
  // const [previousUrl, setPreviousUrl] = useState("")

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    previousUrl: ""
  })


  async function downloadPokemon(){
    // setIsLoading(true) 
    setPokemonListState((state) => ({...state, isLoading: true}))
    const response = await axios.get(pokemonListState.pokedexUrl)
    const pokemonResults = response.data.results
    console.log(response.data);
    setPokemonListState((state) => ({
      ...state, 
      nextUrl: response.data.next, 
      previousUrl: response.data.previous 
    }))
    
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
    setPokemonListState((state) => ({...state, pokemonList: res, isLoading: false}))
    
    
  }
  useEffect(() => {
    downloadPokemon();
  },[pokemonListState.pokedexUrl])
  return (
    <div className='pokemon-list-wrapper'>
      <div>PokemonList</div>
      <div className='pokemon-wrapper'>
      {(pokemonListState.isLoading) ? " Loading.." : 
      pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
      }
      </div>
      <div className='controls'>
        <button disabled={pokemonListState.previousUrl == undefined } onClick={() => {
          const urlToSet = pokemonListState.previousUrl;
          setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
        } }>Prev</button>
        <button disabled={pokemonListState.nextUrl == undefined } onClick={() => {
          const urlToSet = pokemonListState.nextUrl;
          setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
        } }>Next</button>
      </div>
      </div>
  )
}

export default PokemonList