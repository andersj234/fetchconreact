import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [select, setSelect]= useState("")
  const [data2, setData2]= useState([])
  

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((datos) => setData(datos.results));
  }, []);

  let opciones = data.map((opcion, index)=>{
    return <option value={opcion.url}>{opcion.name}</option>
  })

  useEffect(()=>{
    fetch(select)
    .then(res => res.json()).then((datos2)=>{
      let arrayPokemon =[]
      if(datos2.pokemon.length >= 1){
        for (let i = 0; i < 3; i++) {
          let rnd  = Math.floor(Math.random() * datos2.pokemon.length)
          arrayPokemon.push(datos2.pokemon[rnd].pokemon.name)
          
        }

      }else{
        arrayPokemon.push(["no hay ninguno"])
      }
      setData2(arrayPokemon)
    })
  }, [select])

  function Lista(props){
    let listaTemporal= props.data2.map((pokemon, index)=>{
      return (
        <li>{pokemon}</li>
      )
    }) 
    return <ul>{listaTemporal}</ul>
  }

  return (<>
  <select onChange={(e)=>{setSelect(e.target.value)}}>{opciones}</select>
  <Lista data2={data2}/>
  </>)
}
export default App;