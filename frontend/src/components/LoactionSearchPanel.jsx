import React from "react";
import { Link } from "react-router-dom";

const LoactionSearchPanel =(props) =>{
    console.log(props)
    const locations=[
        "4B, Near kapoor's cafe Sheriyan coding school,Bhopal",
        "44, Near Malhotra cafe Sheriyan coding school,Bhopal",
        "44, Near sighinia cafe Sheriyan coding school,Bhopal",
        "44, Near sharma cafe Sheriyan coding school,Bhopal",
        ]
    return (
        <div>
            {
                locations.map(function(elem,idx){
                    return <div Key={idx} onClick={() =>{
                        props.setVehilcePanelOpen(true);
                        props.setPanelOpen(false);
                    }} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 ify-start">
                    <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill"></i></h2>
                    <h4 className="font-medium">{elem}</h4>
                </div> 

                })
            }
        
    
        </div>
            
    )
}
export default LoactionSearchPanel;