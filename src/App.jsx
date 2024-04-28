
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './assets/components/WeatherCard'
// import ComponentPhrase from './assets/components/ComponentPhrase'
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// c1f53bef2ba36e5d1181b83d50fe8ffa


function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
        setShowMessage(true)
    }, 3000)
    const success = pos => {
        
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        })
    }
    const error = () => {
      setHasError(true)
      setIsLoading(false)
    }
  
    navigator.geolocation.getCurrentPosition(success, error)

  }, [])
  
console.log (coords)

useEffect(() => {
  if (coords) {

    const API_KEY = 'c1f53bef2ba36e5d1181b83d50fe8ffa'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}` 

    axios.get(url)
      .then(res => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 9/5 +32).toFixed(1)
        setTemp({celsius,fahrenheit})
      })
      .catch( err => console.log(err))
      .finally(() => setIsLoading(false))
  }

}, [coords])


  return (

      <div className='app'>
      {
        isLoading
        ? (
          <div className='loading'>
            <h2 className='loading__message'>Loading....</h2>
            {
              showMessage && <p>Por favor activa la ubicación para poder ver el clima local.</p>
            }
          </div>
        )
        : (
          hasError
          ? <h2 className='loading__message'>Por favor permite la ubicación para poder ver el clima local.</h2>
          : (
          
          <WeatherCard 
            weather= {weather}
            temp = {temp} />
          
          )
        )
      }

      
      </div>
     
  )
}

export default App
