// C:\Users\ASUS\Desktop\ayu arana care\test-app\test-app\test-app\frontend\src\components\CenterList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, UPLOAD_URL } from '../config/api';

const CenterList = () => {
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        // *** FIX: Corrected API URL to remove /auth/ ***
        const res = await axios.get(`${API_URL}/center`); // <--- CHANGE THIS LINE
        setCenters(res.data);
      } catch (err) {
        console.error('Error fetching centers:', err);
        setError("Error fetching centers. Please try again later.");
        alert("Error fetching centers");
      }
    };
    fetchCenters();
  }, []);

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6">
      {centers.map((center, index) => (
        <div key={center._id || index} className="bg-white p-4 shadow rounded text-center">
          <img
            src={`${UPLOAD_URL}/${center.image}`}
            alt={center.branchName}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="text-xl font-semibold text-blue-800">{center.branchName}</h3>
          <p className="text-gray-700">{center.address}</p>
          <p className="text-sm text-gray-500">{center.email}</p>
        </div>
      ))}
    </div>
  );
};

export default CenterList;