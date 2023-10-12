import React from 'react'
import Search from '../Search/Search'
import './Pokedex.css'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
        <h1 className='heading'>Pokedex</h1>
        <Search />
    </div>
  )
}

export default Pokedex