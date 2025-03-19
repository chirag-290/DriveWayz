import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.name)  // Assuming 'name' holds the location name
        } else if (activeField === 'destination') {
            setDestination(suggestion.name)
        }
        // setPanelOpen(false); // Close panel after selection
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <div>
                            <h4 className='font-medium'>{elem.name}</h4> 
                            <p className='text-sm text-gray-500'>{elem.full_address}</p> {/* Display additional details */}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel
