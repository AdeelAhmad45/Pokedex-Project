
import './App.css'
import Pokedex from './component/Pokedex/Pokedex'
import PokemonList from './component/PokemonList/PokemonList'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
    <div className='outer-wrapper'>
        <h1 className='heading'>
          <Link to='/'>Pokedex</Link>
        </h1>

    <CustomRoutes />
     
     
    </div>
  )
}

export default App
