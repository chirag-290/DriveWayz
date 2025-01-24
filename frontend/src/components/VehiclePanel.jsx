import React from 'react';

const VehiclePanel = (props) => {

    return (
        <div>
        <h5 className="p-3 text-center w-[93%] absolute top-0" onClick={() =>{
            props.setVehilcePanelOpen(false)

        }}><i class="ri-arrow-down-wide-line text-3xl text-gray-200"></i></h5>

        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div onClick={() =>{
            props.setConfirmedRidePanel(true);
        }}className="flex p-3 w-full  items-center justify-between border-2 active:border-black rounded-xl mb-2">
            <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png" alt="" />
            <div className="-ml-2 w-1/2">
                <h4 className="font-medium text-base">UberGO <span><i className="ri-user-3-line"></i>4</span></h4>
                <h5 className="font-medium text-sm">2 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
            </div>
            <h2 className="text-lg font-semibold">$193.20</h2>
        </div>

        <div onClick={() =>{
            props.setConfirmedRidePanel(true);
        }}className="flex p-3 w-full  items-center justify-between border-2 active:border-black rounded-xl mb-2">
            <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s" alt="" />
            <div className="-ml-9 w-1/2">
                <h4 className="font-medium text-base">Moto<span><i className="ri-user-3-line"></i>1</span></h4>
                <h5 className="font-medium text-sm">3 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
            </div>
            <h2 className="text-lg font-semibold">$65</h2>
        </div>

        <div onClick={() =>{
            props.setConfirmedRidePanel(true);
        }}className="flex p-3 w-full  items-center justify-between border-2 active:border-black rounded-xl mb-2">
            <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div className="-ml-2 w-1/2">
                <h4 className="font-medium text-base">UberAuto<span><i className="ri-user-3-line"></i>3</span></h4>
                <h5 className="font-medium text-sm">4 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable Auto rides</p>
            </div>
            <h2 className="text-lg font-semibold">$118.86</h2>
        </div>
        </div>
    )
}

export default VehiclePanel;