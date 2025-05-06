import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptianDetails from "../components/CaptianDetails";
import Ridepop from "../components/Ridepop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/CaptainContext";
import { SocketContext } from "../../context/SocketProvider";

const CaptianHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const ridePopupPanelref = useRef(null);
  const confirmridePopupPanelref = useRef(null);
  const [ride, setRide] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { socket } = useContext(SocketContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("captain", captain);
    socket.emit("join", {
      userType: "captain",
      userId: captain._id,
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    const handleNewRide = (data) => {
      setRide(data);
      setridePopupPanel(true);
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelref.current, {
          transform: "translateY(0)",
          padding: 24,
        });
      } else {
        gsap.to(ridePopupPanelref.current, {
          transform: "translateY(100%)",
          padding: 0,
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmridePopupPanel) {
        gsap.to(confirmridePopupPanelref.current, {
          transform: "translateY(0)",
          padding: 24,
        });
      } else {
        gsap.to(confirmridePopupPanelref.current, {
          transform: "translateY(100%)",
          padding: 0,
        });
      }
    },
    [confirmridePopupPanel]
  );

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("in captain home in hdsifshilfsf", response.data);

    setridePopupPanel(false);
    setconfirmridePopupPanel(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("captain");
    setCaptain(null);
    navigate("/captain-login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="h-screen relative">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen z-20 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">DriveWayz </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <i className={`ri-${menuOpen ? "close" : "menu"}-line text-2xl`}></i>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3">
          <Link
            to={`/captain-history/${captain._id}`}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            <i className="ri-history-line text-lg"></i>
            Ride History
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            <i className="ri-logout-box-line text-lg"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed z-10 w-full bg-white shadow-md transition-all duration-300 ${
          menuOpen ? "top-16" : "-top-full"
        }`}
      >
        <div className="flex flex-col p-4 gap-3">
          <Link
            to={`/captain-history/${captain._id}`}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-600 text-white py-3 rounded-lg shadow transition"
            onClick={() => setMenuOpen(false)}
          >
            <i className="ri-history-line text-lg"></i>
            Ride History
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-600 text-white py-3 rounded-lg shadow transition"
          >
            <i className="ri-logout-box-line text-lg"></i>
            Logout
          </button>
        </div>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt=""
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptianDetails />
      </div>

      <div
        ref={ridePopupPanelref}
        className="fixed w-full z-30 bottom-0 -translate-y-full p-3 bg-white px-3 py-6 pt-12"
      >
        <Ridepop
          ride={ride}
          confirmride={confirmRide}
          setridePopupPanel={setridePopupPanel}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
        />
      </div>

      <div
        ref={confirmridePopupPanelref}
        className="fixed w-full h-screen z-30 bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRidePopup
          ride={ride}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
          setridePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptianHome;
