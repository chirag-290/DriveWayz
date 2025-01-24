import React, { useRef, useState } from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css' 
import LocationSearchPanel from "../components/LoactionSearchPanel";    
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";


const Home = () =>{
    const [pickup,setPickup]=useState('');
    const [destination,setDestination]=useState('');
    const [panelopen,setPanelopen]=useState(false);
    const panelRef=useRef(null);
    const vehiclePanelRef=useRef(null);
    const confirmRidePanelRef=useRef(null);
    const panelCloseRef=useRef(null);
    const vehiclefoundRef=useRef(null);
    const Waitingfordriverref=useRef(null);
    const [vehiclePanelOpen,setVehilcePanelOpen]=useState(false);
    const [confirmedRidePanel,setConfirmedRidePanel]=useState(false);
    const [vehicleFound,setVehicleFound]=useState(false);
    const [Waitingfordriver,setWaitingforDriver]=useState(false);

    const submithandler =(e) =>{
        e.preventDefault();
    }

    useGSAP(function(){
        if(panelopen)
        {
            gsap.to(panelRef.current,{
                height:"70%",
                padding:24
            })
            gsap.to(panelCloseRef.current,{
                opacity:1
            })
        }
        else{
            gsap.to(panelRef.current,{
                height:"0%",
                padding:0
            })
            gsap.to(panelCloseRef.current,{
                opacity:0
            })

        }

    },[panelopen])

    useGSAP(function(){
        if(vehiclePanelOpen)
        {
            gsap.to(vehiclePanelRef.current,{
                transform:"translateY(0)",
                padding:24
            })
        }
        else{
            gsap.to(vehiclePanelRef.current,{
               transform:"translateY(100%)",
                padding:0
            })

        }

    },[vehiclePanelOpen])

    
    useGSAP(function(){
        if(confirmedRidePanel)
        {
            gsap.to(confirmRidePanelRef.current,{
                transform:"translateY(0)",
                padding:24
            })
        }
        else{
            gsap.to(confirmRidePanelRef.current,{
               transform:"translateY(100%)",
                padding:0
            })

        }

    },[confirmedRidePanel])


    useGSAP(function(){
        if(vehicleFound)
        {
            gsap.to(vehiclefoundRef.current,{
                transform:"translateY(0)",
                padding:24
            })
        }
        else{
            gsap.to(vehiclefoundRef.current,{
               transform:"translateY(100%)",
                padding:0
            })

        }

    },[vehicleFound])

    useGSAP(function(){
        if(Waitingfordriver)
        {
            gsap.to(Waitingfordriverref.current,{
                transform:"translateY(0)",
                padding:24
            })
        }
        else{
            gsap.to(Waitingfordriverref.current,{
               transform:"translateY(100%)",
                padding:0
            })

        }

    },[Waitingfordriver])
    
    return (
        
        <div className="h-screen relative overflow-hidden">
             <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

             <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <img className="h-full w-full object-cover"  src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt="" />
                
            </div>
            <div  className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={() =>{
                        setPanelopen(false);
                    }}className="absolute right-6 top-6 text-xl opacity-0">
                    <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                <h4 className="text-2xl font-semibold">Find a trip</h4>
                <form onSubmit={(e) =>{
                    submithandler(e);
                }}>
                    <div className="line absolute h-16 w-1 top-[45%] left-10 bg-black rounded-full opacity-60"></div>
                    <input
                    onClick={() =>{
                        setPanelopen(true)
                    }}
                    value={pickup}
                    onChange={(e) =>{
                        setPickup(e.target.value);
                    }}
                    className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5" 
                    type="text" 
                    placeholder="Add a pick-up loacation"

                    />
                    <br/>
                    <input
                    onClick={() =>{
                        setPanelopen(true)
                    }}
                    value={destination} 
                     onChange={(e) =>{
                        setDestination(e.target.value);
                    }}
                    className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" type="text" placeholder="Enter your destination" />
                </form>
                </div>
                <div ref={panelRef} className="h-[0] bg-white overflow-hidden">
                    <LocationSearchPanel  setPanelOpen={setPanelopen}  setVehilcePanelOpen={setVehilcePanelOpen}/>

                </div>
               
            </div>
            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-10 pt-12">
               <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehilcePanelOpen={setVehilcePanelOpen}/>
            </div>
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12">
               <ConfirmedRide setVehicleFound={setVehicleFound} setConfirmedRidePanel={setConfirmedRidePanel}/>
            </div>
            <div  ref={vehiclefoundRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12">
                <LookingForDriver setVehicleFound={setVehicleFound}/>
              
            </div>
            <div ref={Waitingfordriverref} className="fixed w-full z-10 bottom-0  p-3 bg-white px-3 py-6 pt-12">
                <WaitingForDriver setWaitingforDriver={setWaitingforDriver}/> 
            </div>

        </div>
    )

}

export default Home;