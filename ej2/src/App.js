import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData]=useState([]);
  const [data2, setData2]=useState([]);
  const [loading, setLoading]=useState(false)
  const [select, setSelect]= useState("")

  function Planeta(props){
    const [personajes, setPersonajes]= useState([])
    useEffect(()=>{
      Promise.all(props.urls.map((url)=> fetch(url)))
      .then((respuesta)=> Promise.all(respuesta.map((res)=>res.json())))
      .then((datos)=>{
        setPersonajes(datos);
      })
    }, [setData2])

    const personajesHTML = personajes.map((personaje)=>{
      return (<li>{personaje.name}</li>)
    })

    return (<ul>{personajesHTML}</ul>)
  }
  
  useEffect(()=>{
    setLoading(true)
    fetch("http swapi.dev/api/planets")
    .then((results)=> results.json())
    .then((data)=>{
      setData(data.results);
      setLoading(false)
    })
  }, [])
  
  let mostrarPlanetas = data.map((Planeta, index)=>{
    return <option value={Planeta.url}>{Planeta.name}</option>
  })

    useEffect(()=>{
      fetch(select)
      .then((res)=>res.json())
      .then((datos)=> setData2(datos.residents))
    }, [select])
  if(!loading){ 
    return( <h1>Cargando...</h1>)
    
  }else{
    return (
      <>
      <select onChange={(e)=>setSelect(e.target.value)}>
        {mostrarPlanetas}
      </select>
      <Planeta urls={data2}/>
      </>
    );
  }
}

export default App;
