import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopup = (props) => {

const [OTP, setOTP] = useState("");

  const submithandler=(e) =>{
    e.preventDefault();
  }
  return (
    <div className="h-[90%]">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setconfirmridePopupPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confrim this Ride to Start</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover w-10"
            src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">harsh patel</h2>
        </div>
        <h5 className="tex-lg font-semibold">2.2Km</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya talab,Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya talab,Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">$190.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form onSubmit={
            (e) =>{
              subithandler(e);

            }
          }>
            <input value={OTP} onChange={(e) =>{
              setOTP(e.target.value);
            }} className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-5" type="text"  placeholder="Enter OTP"/>
            <Link to={"/captain-riding"}
          onClick={() => {
            props.setConfirmedRidePanel(false);
          }}
          className="w-full mt-5 flex justify-center text-lg  bg-green-600 text-white font-semibold p-3 rounded-lg "
        >
          Confirm
        </Link>
        <button
          onClick={() => {
            props.setconfirmridePopupPanel(false);
            props.setridePopupPanel(false);
          }}
          className="w-full mt-1 text-lg  bg-red-600 text-white font-semibold p-3 rounded-lg "
        >
          Cancel
        </button>
          </form>
        
        </div>
      </div>
    </div>
  );
};
export default ConfirmRidePopup;
