import { useState, useEffect } from 'react';
import './App.css';

function App () {

  const [search, setSearch] =useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    if(!search) {
      setPokemon(null)
      setError(null)
      return
    }
    const fetchPokemon = async () => {
      try {
      setLoading(true)
      setError(null)

      const name =search.toLowerCase()

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

      if(!response.ok) {
        throw new Error(`No encontrado :(`)
      }

      const data = await response.json()
      setPokemon(data)

    } catch (error) {
      setPokemon(null)
      setError('Pokemon no encontrado :(')
    } finally {
      setLoading(false)
    }
  }
  fetchPokemon()
  }, [search])

  return(
  <>
    <h1>Encuentra tu Pokemon!</h1>
    <form>
      <label htmlFor='pokemon'></label>
      <input
        type='text'
        placeholder='Escribe el Pokemon'
        id='pokemon'
        name='pokemon'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>

    {loading && <p>Cargando...</p>}
    {error && <p>{error}</p>}

    {pokemon && (
      <div className='pokemon-card'>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites?.other?.['official-artwork']?.front_default} alt={pokemon.name} />
      </div>
    )}
  </>
)
};

export default App;
