import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Weather() {
    const [weatherData, setWeatherData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchWeather = async () => {
            try{
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=3e87b4351ee9cd1b3e0ff8f551821bc9`
                )
                setWeatherData(response.data)
                setLoading(false)
            } catch (err: any) {
                console.error("Error fetching weather data:", err.response || err.message)
                setError('Failed to fetch weather data')
                setLoading(false)
            }
        }
        fetchWeather()
    }, [])
    if(loading){
        return <div> Loading</div>
    }
    if(error){
        return <div>{error}</div>
    }
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white text-center py-2">
        <h2 className="text-2xl font-bold">Weather in {weatherData.name}</h2>
      </div>
      <div className="p-4">
        <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
        <p className="text-lg">Weather: {weatherData.weather[0].description}</p>
        <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  )
}

export default Weather