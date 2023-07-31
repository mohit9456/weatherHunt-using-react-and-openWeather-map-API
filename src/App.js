
import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [search, setSearch] = useState('Haldwani');
  const [city, setCity] = useState('');
  const [sys, setSys] = useState('')
  const [wind, setWind] = useState('')
  const [weather, setWeather] = useState('')
  const [main, setMain] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      const a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=haldwani&units=metric&appid=${API_ID}`);
      let b = await a.json();
      let c = Math.floor(b.visibility / 1000);
      setCity(b.main);
      console.log(b);
      setWind(b.wind);
      setWeather(b.weather);
      setSys(c);
      setMain(b.name)
    }
    fetchData();

  }, ["Haldwani"])

  const fetchData = async (ser) => {
    const a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ser}&units=metric&appid=${API_ID}`);
    let b = await a.json();
    let c = Math.floor(b.visibility / 1000);
    setCity(b.main);
    setWind(b.wind);
    setWeather(b.weather);
    setSys(c);
    setMain(b.name)
    console.log(b);
  }

  const handlesubmit = () =>{
    fetchData(search);
    
  }



  return (

    <div className='container '>

      <div style={{ fontFamily: "'REM', sans-serif" }} className="serch-1 text-center mt-4">
        <input onChange={(e) => { setSearch(e.target.value) }} className='serch w-50 py-3 px-5 fs-5 fw-bold text-muted' placeholder='Enter Location' style={{ borderRadius: "39px" }} type="text" />
        
        <button style={{ borderRadius: "17px" }} className='smt py-2 fs-5 text-black fw-bold bg-info px-5' onClick={handlesubmit}>search <i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {!city ? <p className='text-white text-center my-5 py-5 display-3 fw-bold text-capitalize'>Sorry no data found.. try again !!</p> :
        <div>
          <div style={{ fontFamily: "'Mukta', sans-serif" }} className='mt-5 py-2 w-75'>
            <h3 className='name display-5 text-light mt-5 text-decoration-underline text-capitalize'>{main}</h3>
            <div className='d-flex flex-row'>
              <h1 style={{ fontSize: "8rem" }} className='temp text-light fw-bold'>{city.temp.toFixed()} °C </h1>
              <span style={{ fontSize: "8rem" }} className='temp text-light mx-5'>{weather[0].main === "Clouds" ? <i className="fa-solid fa-cloud text-muted"></i> : (weather[0].main === "Clear" ? <i className="fa-solid fa-sun text-warning"></i> : (weather[0].main === "Rain" ? <i className="fa-solid fa-cloud-rain text-primary"></i> : <i className="fa-solid fa-cloud-sun text-warning border-outline-dark"></i>))}</span>
              <span style={{ fontFamily: "'Signika Negative', sans-serif" }} className='text-light mt-5 fs-2 text-capitalize'>{weather[0].description}</span>

            </div>

            <h4 className='px-1  text-light'> Min.  {city.temp_min} °C  |  Max.  {city.temp_max} °C </h4>
          </div>



          <div style={{ fontFamily: "'Ubuntu', sans-serif" }} className="bottom d-flex justify-content-center text-dark fw-bold mt-5 ">
            <div style={{ margin: "30px", backgroundColor: "#ffffff", opacity: "0.7", borderRadius: "21px" }} className="bottom-1 text-center py-4 px-5 fs-5 w-50">
              <div>Feels like : {city.feels_like.toFixed()} °C</div>

              <div>Wind Gust : {wind.gust ? wind.gust : "0"} km/hr</div>
              <div>Visibility: {sys} km</div>
            </div>
            <div style={{ margin: "30px", backgroundColor: "#ffffff", opacity: "0.7", borderRadius: "21px" }} className="bottom-1 text-center py-4 px-5 fs-5 w-50">
              <div>Humidity : {city.humidity}%</div>
              <div className='pb-1'>Wind Speed : {wind.speed} km/hr  <br /><span className='text-decoration-underline'> ( {(45 < wind.deg < 135) ? "East to West" : ((134 < wind.deg < 225) ? "South to North" : (224 < wind.deg < 315 ? " West to East" : "North to South"))} direction )</span></div>

            </div>
          </div>
        </div>}

    </div>
  );
}

export default App;
