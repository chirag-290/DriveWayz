import {React,useRef} from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from 'react';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

  const[finishRidepanel, setFinishRidepanel] = useState(false);
  const location = useLocation()
  const rideData = location.state?.ride
  const  finishRidepanelref= useRef(null);



  
  useGSAP(
    function () {
      if (finishRidepanel) {
        gsap.to(finishRidepanelref.current, {
          transform: "translateY(0)",
          padding: 24,
        });
      } else {
        gsap.to(finishRidepanelref.current, {
          transform: "translateY(100%)",
          padding: 0,
        });
      }
    },
    [finishRidepanel]
  );


    return (
        <div className="h-screen">
        <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link 
            to="/captain-home"
            className="h-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="ri-logout-box-line text-lg font-medium"></i>
          </Link>
        </div>
  
        <div className="h-4/5">
          <img
            className="h-full w-full object-cover"
            src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
            alt=""
          />
        </div>
        <div className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400" onClick={() =>{
          setFinishRidepanel(true);
        }}>
        <h5
        className="p-1 text-center w-[95%] absolute top-0"
        onClick={() => {
    

        }}
      >
        <i className="ri-arrow-up-wide-line text-3xl text-black"></i>
      </h5>
        <h4 className='text-xl font-semibold'>4 Km away</h4>
        <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Comelete Ride</button>

        </div>
        <div
        ref={finishRidepanelref}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full  p-3 bg-white px-3 py-6 pt-12"
      >
        <FinishRide 
        rideData={rideData}

        setFinishRidepanel={setFinishRidepanel}  />
      </div>
      </div>
    )
}

export default CaptainRiding;