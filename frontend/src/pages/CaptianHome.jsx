import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptianDetails from "../components/CaptianDetails";
import Ridepop from "../components/Ridepop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";

const CaptianHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const ridePopupPanelref = useRef(null); 
  const confirmridePopupPanelref = useRef(null);  


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




  
  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/home"
          className="h-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-line text-lg font-medium"></i>
        </Link>
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
        className="fixed w-full z-10 bottom-0 -translate-y-full  p-3 bg-white px-3 py-6 pt-12"
      >
        <Ridepop setridePopupPanel={setridePopupPanel} setconfirmridePopupPanel={setconfirmridePopupPanel} />
      </div>
      <div
        ref={confirmridePopupPanelref}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full  p-3 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRidePopup setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel}  />
      </div>
    </div>
  );
};

export default CaptianHome;
