
import React, { useState, useEffect } from "react";
import Axios from "axios";



function Missions() {
    const [missions, setProducts] = useState([]);

    const config = {
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const fetchMissions = async () => {
      const { data } = await Axios.get(
        "http://localhost:5001/api/Admin/missions",config
      );
      const missions = data;
      setProducts(missions);
      console.log(missions);
    };
  
    useEffect(() => {
    fetchMissions();
    }, []);
  
    return (
      <div>
        {missions.map((miss) => (
          <p key={miss.id}>{miss.vidSource}</p>
        ))}
      </div>
    );
  }


export default Missions