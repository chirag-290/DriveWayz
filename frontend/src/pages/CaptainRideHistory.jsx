import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CaptainRideHistory = () => {
  const { captainId } = useParams();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaptainRides = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/captain/${captainId}`);
        setRides(res.data.rides);
        console.log("Captain Rides:", res.data.rides);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load captain's ride history.");
        setLoading(false);
      }
    };

    fetchCaptainRides();
  }, [captainId]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-red-500 bg-red-100 p-4 rounded shadow-md">
        <p className="font-semibold">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Captain Ride History</h1>
          <Link to="/captain-home" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Back to Dashboard
          </Link>
        </div>

        {rides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-700">No rides found</h3>
            <p className="mt-2 text-gray-500">You haven't completed any rides yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <div key={ride._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gray-800 text-white p-4">
                  <p className="text-lg font-semibold">Ride on {new Date(ride.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Passenger</p>
                      <p className="font-medium">{ride.user?.fullname.firstname || "Unknown"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{ride.pickup}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{ride.destination}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <p className="font-medium">{ride.vehicleType || "Standard"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Fare</p>
                      <p className="text-2xl font-bold text-gray-800">₹{ride.fare}</p>
                    </div>
                  </div>
                  
                  {ride.status && (
                    <div className={`mt-4 py-1 px-3 text-sm font-medium rounded-full text-center ${
                      ride.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : ride.status === "cancelled" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptainRideHistory;