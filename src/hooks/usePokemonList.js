import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function usePokemonList() {
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
      return {pokemonListState, setPokemonListState}
}

export default usePokemonList