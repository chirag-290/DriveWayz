import React, { useRef, useState, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css' 
import LocationSearchPanel from "../components/LoactionSearchPanel";    
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../../context/SocketProvider";
import { UserDatacontext } from "../../context/Usercontext";
import { useNavigate, Link } from 'react-router-dom';
// import MapboxLiveTracking from "../components/LiveTracking";

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelopen, setPanelopen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclefoundRef = useRef(null);
    const Waitingfordriverref = useRef(null);
    const [vehiclePanelOpen, setVehilcePanelOpen] = useState(false);
    const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [Waitingfordriver, setWaitingforDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)

    const {socket} = useContext(SocketContext);
    const {user, setUser} = useContext(UserDatacontext);

    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        console.log("hello in logout")
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        if (user) {
            socket.emit("join", { userType: "user", userId: user._id })
        }
    }, [user]);

    useEffect(() => {
        const handleRideConfirmed = (ride) => {
            console.log("Ride confirmed:", ride);
            setVehicleFound(false);
            setWaitingforDriver(true);
            setRide(ride);
        };

        const handleRideStarted = (ride) => {
            setWaitingforDriver(false);
            navigate('/riding', { state: { ride } });
        };

        socket.on('ride-confirmed', handleRideConfirmed);
        socket.on('ride-started', handleRideStarted);

        return () => {
            socket.off('ride-confirmed', handleRideConfirmed);
            socket.off('ride-started', handleRideStarted);
        };
    }, [socket, navigate]);

    const submithandler = (e) => {
        e.preventDefault();
    }

    useGSAP(function() {
        if(panelopen) {
            gsap.to(panelRef.current, {
                height: "70%",
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: "0%",
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelopen]);

    useGSAP(function() {
        if(vehiclePanelOpen) {
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(0)",
                padding: 24
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
               transform: "translateY(100%)",
                padding: 0
            })
        }
    }, [vehiclePanelOpen]);

    useGSAP(function() {
        if(confirmedRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: "translateY(0)",
                padding: 24
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
               transform: "translateY(100%)",
                padding: 0
            })
        }
    }, [confirmedRidePanel]);

    useGSAP(function() {
        if(vehicleFound) {
            gsap.to(vehiclefoundRef.current, {
                transform: "translateY(0)",
                padding: 24
            })
        } else {
            gsap.to(vehiclefoundRef.current, {
               transform: "translateY(100%)",
                padding: 0
            })
        }
    }, [vehicleFound]);

    useGSAP(function() {
        if(Waitingfordriver) {
            gsap.to(Waitingfordriverref.current, {
                transform: "translateY(0)",
                padding: 24
            })
        } else {
            gsap.to(Waitingfordriverref.current, {
               transform: "translateY(100%)",
                padding: 0
            })
        }
    }, [Waitingfordriver]);

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data);
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    async function findTrip() {
        setVehilcePanelOpen(true)
        setPanelopen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data);
        setFare(response.data)
    }

    async function createRide() {
        console.log("in create ride", pickup, destination, vehicleType);
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <div className="h-screen relative overflow-hidden">
            {/* App Logo and Title */}
            <h1 className="absolute left-5 top-5 text-2xl font-bold z-40">RideEase</h1>
             
            {/* Mobile Menu Button */}
            <div className="absolute right-5 top-5 md:hidden z-50">
                <button 
                    onClick={toggleMenu}
                    className="text-lg bg-black text-white p-2 rounded-full"
                >
                    <i className={`ri-${menuOpen ? 'close' : 'menu'}-line`}></i>
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className="absolute right-5 top-5 hidden md:flex gap-3 z-50">
                <Link 
                    to={`/ride-history/${user._id}`} 
                    className="text-lg bg-black text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-800 transition"
                >
                    <i className="ri-history-line"></i>
                    Ride History
                </Link>

                <button 
                    onClick={handleLogout}
                    className="text-lg bg-black text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-800 transition"
                >
                    <i className="ri-logout-box-line"></i>
                    Logout
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div 
                className={`fixed top-0 right-0 h-auto w-full bg-white shadow-lg z-40 transition-transform duration-300 ${
                    menuOpen ? 'translate-y-16' : '-translate-y-full'
                }`}
            >
                <div className="flex flex-col p-4">
                    <Link 
                        to={`/ride-history/${user._id}`}
                        className="text-lg bg-black text-white px-4 py-3 rounded-lg mb-2 flex items-center justify-center gap-2"
                        onClick={() => setMenuOpen(false)}
                    >
                        <i className="ri-history-line"></i>
                        Ride History
                    </Link>

                    <button 
                        onClick={(e) => {
                            handleLogout(e);
                            setMenuOpen(false);
                        }}
                        className="text-lg bg-black text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                        <i className="ri-logout-box-line"></i>
                        Logout
                    </button>
                </div>
            </div>

            <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <img className="h-full w-full object-cover" src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt="" />
                {/* <MapboxLiveTracking/> */}
            </div>

            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5 
                        ref={panelCloseRef} 
                        onClick={() => {
                            setPanelopen(false);
                        }}
                        className="absolute right-6 top-6 text-xl opacity-0"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submithandler(e);
                    }}>
                        <div className="line absolute h-16 w-1 top-[45%] left-10 bg-black rounded-full opacity-60"></div>
                        <input
                            onClick={() => {
                                setPanelopen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5" 
                            type="text" 
                            placeholder="Add a pick-up location"
                        />
                        <br/>
                        <input
                            onClick={() => {
                                setPanelopen(true)
                                setActiveField('destination')
                            }}
                            value={destination} 
                            onChange={handleDestinationChange}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" 
                            type="text" 
                            placeholder="Enter your destination" 
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'
                    >
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className="h-[0] bg-white overflow-hidden">
                    <LocationSearchPanel  
                        setPanelOpen={setPanelopen}  
                        setVehilcePanelOpen={setVehilcePanelOpen}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                    />
                </div>
            </div>

            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-10 pt-12">
                <VehiclePanel 
                    setVehicleType={setVehicleType} 
                    fare={fare} 
                    setConfirmedRidePanel={setConfirmedRidePanel} 
                    setVehilcePanelOpen={setVehilcePanelOpen}
                />
            </div>

            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12">
                <ConfirmedRide 
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    createRide={createRide} 
                    setVehicleFound={setVehicleFound} 
                    setConfirmedRidePanel={setConfirmedRidePanel}
                />
            </div>

            <div ref={vehiclefoundRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12">
                <LookingForDriver 
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={Waitingfordriverref} className="fixed w-full z-10 bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12">
                <WaitingForDriver 
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    WaitingForDriver={Waitingfordriver}
                    setWaitingforDriver={setWaitingforDriver}
                /> 
            </div>
        </div>
    )
}

export default Home;