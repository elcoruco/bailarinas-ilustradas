import {csv} from "d3-fetch";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(null);
  csv("vestuarios.csv").then(res => {
    if(!items){
      setItems(res.reverse());
    }
  });
  
  return (
    <div className="App">
      <table className="table-auto border-collapse border border-grey">
        <thead>
          <tr>
            <th className="border border-grey-600">Imagen</th>
            <th className="border border-grey-600">Artista</th>
            <th className="border border-grey-600">Tipo</th>
            <th className="border border-grey-600">Color</th>
            <th className="border border-grey-600">Evento</th>
            <th className="border border-grey-600">Año</th>
            <th className="border border-grey-600">País</th>
            <th className="border border-grey-600">Estado</th>
            <th className="border border-grey-600">Canción</th>
            <th className="border border-grey-600">referencia</th>
            <th className="border border-grey-600">facebook</th>
            <th className="border border-grey-600">instagram</th>
          </tr>
        </thead>
        <tbody>
        {items && items.map( (item,i) => 
          <tr key={`item-${i}`}>
            <td className="border border-grey-600"><img style={{
              'width': '250px',
              'borderRadius': '8px',
              'padding' : '.2em'
              }} src={`img/covers/${item.pic}.jpg`}></img></td>
            <td className="border border-grey-600">{item.source}</td>
            <td className="border border-grey-600">{item.type}</td>
            <td className="border border-grey-600">{item.color}</td>
            <td className="border border-grey-600">{item.event}</td>
            <td className="border border-grey-600">{item.year}</td>
            <td className="border border-grey-600">{item.country}</td>
            <td className="border border-grey-600">{item.state}</td>
            <td className="border border-grey-600">{item.song}</td>
            <td className="border border-grey-600"><a href={item.url} target="_blank">referencia</a></td>
            <td className="border border-grey-600">{item.fb && <a href={item.fb}>link</a>}</td>
            <td className="border border-grey-600">{item.instagram && <a href={item.instagram}>link</a>}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
