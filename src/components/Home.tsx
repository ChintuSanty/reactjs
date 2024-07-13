import React from 'react'
import Weather from './Weather'
import Gold from './Gold'

function Home() {
    return (
        <div className='flex h-screen'>
            <div className='w-1/5 bg-gray-200 p-4'>
                <Weather />
                <br/>
                <Gold />
            </div>
            <div className='w-3/5 bg-gray-100 p-4'>
            </div>
            <div className='w-1/5 bg-gray-200 p-4'>
            </div>
        </div>
    )
}

export default Home