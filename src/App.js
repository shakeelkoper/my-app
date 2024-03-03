import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  console.log("First Line")
  const [pokemonList, setPokemonList] = useState([])
  const [userSelect, setUserSelect] = useState("")
  const [abilities, setAbilities] = useState([])
  function getPokemonData() {
    console.log("getPokemonData Function")
    let results;
    axios.get('https://pokeapi.co/api/v2/pokemon').then((data)=>{
        console.log(data.data.results)
        results = data.data.results
        setPokemonList(results)
      }
    )  
  }
  function getPokemonURL(e){
    setUserSelect(e.target.value)
  }
  useEffect(()=>{
    if(userSelect){
      axios.get(userSelect).then((data)=>{
        console.log(data.data.abilities)
        setAbilities(data.data.abilities)
      })
    }
  },[userSelect])
  useEffect(()=>{
    console.log("useffect with empty dependancy array")
    getPokemonData()
  },[])
  const pokemonOptions = pokemonList.map((item, i)=><option value={item.url} key={i}>{item.name}</option>)
  const abilitiesList = abilities.map((item, i)=><li key={i}>{item.ability.name}</li>)
  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <select onChange={getPokemonURL}>
        {pokemonOptions}
      </select>
      {/* <h2>Selected Pokemon: {userSelect}</h2> */}
      <h2>Abilities</h2>
      <ul>{abilitiesList}</ul>
    </div>
  );
}

export default App;
   