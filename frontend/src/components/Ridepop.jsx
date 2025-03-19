import React from "react";

const Ridepop = (props) => {
    return (
        <div>
              <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setridePopupPanel(false);

        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
            <img className="h-12 w-12 rounded-full object-cover w-10" src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" alt="" />
            <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
       <div className="flex items-center mt-5 justify-between w-full">
       <button onClick={() =>{
          props.setridePopupPanel(false);

        }} className=" bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg ">
          ignore
        </button>
       <button onClick={() =>{
            props.setconfirmridePopupPanel(true);
            props.confirmride()
            // props.setridePopupPanel(false);
        }} className="  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg ">
          Accept
        </button>
       
       </div>
      </div>
        </div>
    )
}   

export default Ridepop;