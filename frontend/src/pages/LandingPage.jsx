import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { Image, Space } from 'antd'

const LandingPage = () => {
  const navigate=useNavigate()

  const token = sessionStorage.getItem("authToken"); // Check if user is logged in (token present)
  const id = sessionStorage.getItem("id");
  

  useEffect(() => {
    if (token && id) {
      navigate(`/patient/dashboard/${id}`);
    }
    else{
      navigate('/');
    }
  }, [token, id,navigate]);

  const handleRefreshPatient = async () => {
    console.log('Patient Clicked')
    navigate('/patient')

    // useEffect(() => {
    //   setSpinner(true); // Set loading to true when route changes
    //   const timer = setTimeout(() => {
    //     setSpinner(false); // Stop loading after a delay (simulate loading)
    //   }, 100); // Adjust this delay to match your data loading or API calls
  
    //   return () => clearTimeout(timer); // Cleanup the timer when component unmounts
    // }, []); // Rerun this effect when the route changes
    sessionStorage.setItem('role', 'patient')
    
  }
  return (
    <div className="bg-green-100 h-screen flex justify-between  overflow-hidden">
      <div className='flex flex-col gap-3 justify-center items-center ml-24'>
        <h1 className="text-4xl  text-center">Welcome to the HeathDrive!</h1>
        <p className="text-xl text-center">Register Yourself in the ecosystem of Doctors and Patients in a Digital Way!</p>
        <Space className='mt-7 flex-col'>
          <p>Register Yourself As</p>
          <button className="bg-green-700 hover:bg-green-800 text-white  py-2 px-4 rounded w-96">Doctor</button>
          <button className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded w-96" onClick={handleRefreshPatient}>Patient</button>
        </Space>
      </div>
      <div className='bg-green-900 h-screen  border-green-900 shadow-2xl'>
        <Image src='../../landing.png' preview={false} alt='landing page image' height={600} className='right-0 relative mt-1 md:hidden'/>
      </div>
    </div>
  )
}

export default LandingPage