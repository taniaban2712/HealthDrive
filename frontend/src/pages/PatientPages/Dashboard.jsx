import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Dashboard = () => {

  const [patientData, setPatientData]=useState([]);
  const patientId = useParams().id;

  useEffect(() => {
    axios.get(`http://localhost:3000/patient/${patientId}`)
    .then((response) => {
      console.log(response)
      setPatientData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [patientId]);
  
  

  return (
    <div>
      <Navbar data={patientData}/>
    </div>
  )
}

export default Dashboard