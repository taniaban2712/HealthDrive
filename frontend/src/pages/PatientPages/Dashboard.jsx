import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate=useNavigate();

  const [patientData, setPatientData]=useState([]);
  const patientId = useParams().id;

  const token = sessionStorage.getItem('authToken');
  const id=sessionStorage.getItem('id');
  if(!token || id!==patientId){
    navigate(`/patient/dashboard/${id}`)
  }

  console.log(token)

  useEffect(() => {
    axios.get(`http://localhost:3000/patient/${patientId}`,
      { headers: { authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response)
      setPatientData(response.data);
    })
    .catch((error) => {
      console.log(error);
      navigate('/patient/login')
    });
  }, [patientId]);

  return (
    <div>
      <Navbar data={patientData}/>
    </div>
  )
}

export default Dashboard