import {csv} from "d3-fetch";
import { useState, useEffect } from "react";
import ReactGA from 'react-ga';

ReactGA.initialize('G-QGFD1S4ZCN')

function App() {

  const [items, setItems] = useState(null);
  // const [items, setItems]   = useState(null);
  const [filteredItems, setFilteredItems]   = useState(null);
  const [artist, setArtist] = useState('');
  const [years, setYears]   = useState([]);
  const [year, setYear]     = useState('');

  useEffect( () => {
    if(!items || years.length) return;
    let ylist = [...new Set(items.map(item => +item.year))]
    setYears(ylist.sort())
  });
  
  useEffect( () => {
    if(!items || filteredItems) return;
    let baseItems = [...items];
    setFilteredItems(baseItems)
  });
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
    <div className="App container mx-auto px-6">
      <h1>Vestuarios ilustrados</h1>
      <p>Esta es una colección de ilustraciones de vestuarios que me han gustado.
        He capturado algunos metadatos de los vestuarios, como el evento en el que
        se usaron, el año, el nombre de la bailarina y sus redes sociales, además del
        link del video en el que vi el vestuario. Todo esto se puede descargar de  
         <a href="https://github.com/elcoruco/bailarinas-ilustradas">github</a>. 
        También es posible ver las ilustraciones en 
         <a href="https://www.facebook.com/vestuariosilustrados">facebook</a>   
        e <a href="https://www.instagram.com/comoaprendiabailar/">instagram</a>.
      </p>
      <form>
        <input type="text" placeholder="artista" onChange={e => setArtist(e.target.value)}></input>
        <select onChange={e => setYear(e.target.value)}>
          <option value="">selecciona un año</option>
          {years.map(y => 
          <option key={`year-opt-${y}`}>{y}</option>
          )}
        </select>
      </form>
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
        {filteredItems && filteredItems.map( (item,i) => 
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
      <footer>Última actualización: 2 de noviembre de 2021</footer>
    </div>
  );
}

export default App;
