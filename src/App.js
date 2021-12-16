import {csv} from "d3-fetch";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(null);
  const tags = [ "vestuariosilustrados", "salsacostume", "fashionillustration", 
    "procreateFashionIllustration", "fashionDesign", "illustration", "animeDancer", 
    "animeCostume", "procreateApp", "Salsa"];
  
  const makeHash = text => text ? text.replaceAll(" ", "") : '';
  
  const makeInstagramText = item => {
    return `El siguiente post es un vestuario de ${item.source} ${item.country ? '(' + item.country + ')' : ''}:
    Se presentó en el #${makeHash(item.event)} ${item.year}
    referencia: ${item.url}
    #${makeHash(item.tipo)}
    #${item.color}
    #${tags.join(' #')}
    ${item.fb ? 'en fb: ' + item.fb : ''}
    ${item.song ? 'canción: ' + item.song : ''}`
    
  }
  csv("vestuarios.csv").then(res => {
    if(!items){
      setItems(res.reverse());
    }
  });

  const makeFacebookText = item => {
    return <p>Ilustración basada en un vestuario de {item.source} {item.country ? '(' + item.country + ')' : ''}:
    <br></br>
    presentado en el {item.event} {item.year}
    <br></br>
    referencia: {item.url}
    <br></br>
    #{makeHash(item.tipo)}
    #{item.color}
    {tags.join(' #')}
    <br></br>
    {item.fb ? 'en fb: ' + item.fb : ''}
    <br></br>
    {item.song ? 'canción: ' + item.song : ''}</p>;
  }
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
            <th className="border border-grey-600">instagram TEXT</th>
            <th className="border border-grey-600">facebook TEXT</th>
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
            <td className="border border-grey-600">{makeInstagramText(item)}</td>
            <td className="border border-grey-600">{makeFacebookText(item)}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
