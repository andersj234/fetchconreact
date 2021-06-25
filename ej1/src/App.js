import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/");
  const [data, setData] = useState([]);
  const [next, setNext]= useState("")
  const [previo, setPrevio]= useState("")
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then((datos) => {
        setData(datos.results);
        setNext(datos.info.next);
        setPrevio(datos.info.prev)
      });
    setLoading(false);
  }, [url]);

  const api = data.map((personaje, index)=>{
    return (
      <div key={index}>
        <p>{personaje.name}</p>
        <img src={personaje.image} alt={personaje.name}/>
      </div>
    )
  })

  

  if (loading) {
    return <h1>Cargando ...</h1>
  } else {
    return (<>
    <div>{api}</div>
    <div>
      <button onClick={()=>{setUrl(next)}}>pasar página</button>
      <button onClick={()=>{previo !== null ? setUrl(previo) : setUrl("https://rickandmortyapi.com/api/character/")}}>Retroceder página</button>
    </div>
    </>)
  }
}
  
export default App;