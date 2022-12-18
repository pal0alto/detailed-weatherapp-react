import React from 'react'
import { UilLocationPoint, UilSearch } from '@iconscout/react-unicons'
import { useState } from 'react';

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState('')

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  const handleSearchClick = () => {
    if (city !== '') setQuery({q: city})
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  }

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input value={city} onChange={(e) => setCity(e.currentTarget.value)} type="text" className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize' placeholder='Search...' />
            <UilSearch onClick={handleSearchClick} size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" />
            <UilLocationPoint onClick={handleLocationClick} size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" />
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button onClick={handleUnitsChange} name='metric' className='text-xl text-white font-medium transition ease-out hover:scale-125'>°C</button>
            <p className='text-xl text-white mx-1 font-medium'>|</p>
            <button onClick={handleUnitsChange} name='imperial' className='text-xl text-white font-medium transition ease-out hover:scale-125'>°F</button>
        </div>

    </div>
  )
}

export default Inputs