import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Gold() {
    const [goldPrice, setGoldPrice] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [location, setLocation] = useState<{city: string, country: string, currency: string, unit: string} | null>(null)

    useEffect(() => {
        const fetchLocation = async () => {
            try{
                const response = await axios.get('https://ipapi.co/json/')
                const unit = response.data.country === "United States" ? "ounce" : "kilogram"; // Example logic for unit selection
                setLocation({
                    city: response.data.city,
                    country: response.data.country,
                    currency: response.data.currency,
                    unit
                })
            } catch (err: any){
                console.error("Error fetching location data:", err.response || err.message);
                setError('Failed to fetch location data');
                setLoading(false);
            }
        }
        fetchLocation()
    },[])

    useEffect(() => {
        if(location) {
            const fetchGoldPrice =  async () => {
                try{
                    const response = await axios.get(`https://www.goldapi.io/api/XAU/${location.currency}`,{
                        headers: {
                            'x-access-token': 'goldapi-4my3fslyk9hnbd-io',
                            'Content-Type': 'application/json'
                        }
                    }
                    )
                    const pricePerOunce = response.data.price
                    const price = location.unit === "kilogram" ? pricePerOunce * 35.274 : pricePerOunce;
                    setGoldPrice(price)
                    setLoading(false)
                  } catch (err: any) {
                    console.error("Error fetching gold prices data:", err.response || err.message)
                    setError('Failed to fetch gold prices data')
                    setLoading(false);
                  }
                }
                fetchGoldPrice()
        }
    }, [location])

   if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-yellow-500 text-white text-center py-2">
        <h2 className="text-2xl font-bold">Gold Price</h2>
        <p>{location?.city}, {location?.country}</p>
      </div>
      <div className="p-4">
      <p className="text-lg">Current Price: {location?.currency} {goldPrice?.toFixed(2)} per {location?.unit}</p>
      </div>
    </div>
  )
}
export default Gold