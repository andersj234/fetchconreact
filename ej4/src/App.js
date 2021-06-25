import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData]=useState([])
  const [select, setSelect]= useState("")
  useEffect(()=>{
    fetch("https://api.magicthegathering.io/v1/sets")
    .then(res=> res.json())
    .then((datos)=> setData(datos.sets))
  },[])

  let sets = data.map((sets, index)=>{
    return(
      <option value={index}>{sets.name}</option>
    )
  })

  useEffect(()=>{
    fetch(`https://api.magicthegathering.io/v1/sets/${}/booster`)    //tiene que ir un nombre
  })
  return (
    <select>{sets}</select>
  );
}

export default App;
