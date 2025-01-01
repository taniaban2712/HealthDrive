import React from "react";
import { useState } from "react";
import { Card, Input, message, Select } from "antd";
import { Form } from "antd";
import axios from "axios";

const bloodGroupItems = [
  { title: "A+", key: "1" },
  { title: "A-", key: "2" },
  { title: "B+", key: "3" },
  { title: "B-", key: "4" },
  { title: "O+", key: "5" },
  { title: "O-", key: "7" },
  { title: "AB+", key: "8" },
  { title: "AB-", key: "9" },
];

const gender = [
  { title: "Female", key: "1" },
  { title: "Male", key: "2" },
  { title: "Other", key: "3" },
];

const updateData = async (data) => {
    console.log("data", data);
    try{
        const response = await axios.patch(`http://localhost:3000/patient/${data._id}`, data);
        console.log("response", response);
        message.success("Data updated successfully!");
    }
    catch(error){
        message.error("There was an error updating the data");
        console.log(error);
    }
}



const PatientCard = (data) => {
  console.log("patientcard data", data);

  const [change, setChange] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editContactNumber, setEditContactNumber] = useState(false);
  const [editBloodGroup, setEditBloodGroup] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const [editAge, setEditAge] = useState(false);

  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleAgeSubmit = () => {
    setEditAge(false);
    if(!change) setChange(true)
    if (
      document.getElementsByName("age")[0].value > 0 &&
      document.getElementsByName("age")[0].value < 120
    ) {
      console.log(document.getElementsByName("age")[0].value);
      data.data.age = parseInt(document.getElementsByName("age")[0].value);
    }
  };
  const handleNameSubmit = () => {
    setEditName(false);
    if(!change) setChange(true)
    if (document.getElementsByName("name")[0].value) {
      console.log(document.getElementsByName("name")[0].value);
      data.data.name = document.getElementsByName("name")[0].value;
    }
  };
  const handleEmailSubmit = () => {
    setEditEmail(false);
    if(!change) setChange(true)
    if (
      document.getElementsByName("email")[0].value &&
      document.getElementsByName("email")[0].value.includes("@") &&
      document.getElementsByName("email")[0].value.includes(".")
    ) {
      //valid email
      console.log(document.getElementsByName("email")[0].value);
      data.data.email = document.getElementsByName("email")[0].value;
    }
  };
  const handleContactNumberSubmit = () => {
    setEditContactNumber(false);
    if(!change) setChange(true)
    if (
      document.getElementsByName("contactNumber")[0].value.length === 10 &&
      !isNaN(document.getElementsByName("contactNumber")[0].value)
    ) {
      //valid phone number
      console.log(document.getElementsByName("contactNumber")[0].value);
      data.data.contactNumber =
        parseInt(document.getElementsByName("contactNumber")[0].value);
    }
  };
  const handleBloodGroupSubmit = () => {
    setEditBloodGroup(false);
    if(!change) setChange(true)
      data.data.bloodGroup = bloodGroupItems[selectedBloodGroup-1].title;
    
  };
  const handleGenderSubmit = () => {
    setEditGender(false);
    if(!change) setChange(true)
      data.data.gender = selectedGender;
    
  };

  if(change){
    updateData(data.data);
  }

  const handleChangeBloodGroup = (value) => {
    setSelectedBloodGroup(value);
    console.log('Selected blood group:', value); // This will log the selected value
  };

  const handleChangeGender = (value) => {  
    setSelectedGender(value);
    console.log('Selected gender:', value); // This will log the selected value
  }

  return (
    <div className="">
      <Card
        title="Name"
        size="small"
        extra={
          editName ? (
            <div className="flex gap-4">
              <a onClick={handleNameSubmit}>Save</a>
              <a onClick={() => setEditName(false)}>Cancel</a>
            </div>
          ) : (
            <a onClick={() => setEditName(true)}>Edit</a>
          )
        }
        style={{
          width: 330,
          height: 100,
          backgroundColor: "#e0ebe1",
          marginBottom: 10,
        }}
      >
        {editName ? (
          <Input name="name" placeholder="Enter Your Name" />
        ) : (
          <p>{data.data.name}</p>
        )}
      </Card>

      <Card
        title="Email"
        size="small"
        extra={
          editEmail ? (
            <div className="flex gap-4">
              <a onClick={handleEmailSubmit}>Save</a>
              <a onClick={() => setEditEmail(false)}>Cancel</a>
            </div>
          ) : (
            <a onClick={() => setEditEmail(true)}>Edit</a>
          )
        }
        style={{
          width: 330,
          height: 100,
          backgroundColor: "#e0ebe1",
          marginBottom: 10,
        }}
      >
        {editEmail ? (
          <Input name="email" placeholder="Enter Your Email" />
        ) : (
          <p>{data.data.email}</p>
        )}
      </Card>
      <Card
        title="Contact Number"
        size="small"
        extra={
          editContactNumber ? (
            <div className="flex gap-4">
              <a onClick={handleContactNumberSubmit}>Save</a>
              <a onClick={() => setEditContactNumber(false)}>Cancel</a>
            </div>
          ) : (
            <a onClick={() => setEditContactNumber(true)}>Edit</a>
          )
        }
        style={{
          width: 330,
          height: 100,
          backgroundColor: "#e0ebe1",
          marginBottom: 10,
        }}
      >
        {editContactNumber ? (
          <Input placeholder="Enter Contact Number" name="contactNumber" />
        ) : (
          <p>{data.data.contactNumber}</p>
        )}
      </Card>
      <Card
        title="Age"
        size="small"
        extra={
          editAge ? (
            <a onClick={handleAgeSubmit}>Save</a>
          ) : (
            <a onClick={() => setEditAge(true)}>Edit</a>
          )
        }
        style={{
          width: 330,
          height: 100,
          backgroundColor: "#e0ebe1",
          marginBottom: 10,
        }}
      >
        {editAge ? (
          <Input name="age" placeholder="Enter Your Age" />
        ) : (
          <p>{data.data.age}</p>
        )}
      </Card>

      <Card
        title="Blood Group"
        size="small"
        extra={
          editBloodGroup ? (
            <div className="flex gap-4">
              <a onClick={handleBloodGroupSubmit}>Save</a>
              <a onClick={() => setEditBloodGroup(false)}>Cancel</a>
            </div>
          ) : (
            <a onClick={() => setEditBloodGroup(true)}>Edit</a>
          )
        }
        style={{
          width: 330,
          height: 100,
          backgroundColor: "#e0ebe1",
          marginBottom: 10,
        }}
      >
        {editBloodGroup ? (
          <Select
            name="bloodGroup"
            placeholder="Select a blood group"
            value={selectedBloodGroup}
            onChange={handleChangeBloodGroup}
            allowClear
          >
            {bloodGroupItems.map((item) => (
              <div key={item.key} >{item.title}</div>
            ))}
          </Select>
        ) : (
          <p>{data.data.bloodGroup}</p>
        )}
      </Card>
      <Card
        title="Gender"
        size="small"
        extra={
          editGender ? (
            <div className="flex gap-4">
              <a onClick={handleGenderSubmit}>Save</a>
              <a onClick={() => setEditGender(false)}>Cancel</a>
            </div>
          ) : (
            <a onClick={() => setEditGender(true)}>Edit</a>
          )
        }
        style={{
          width: 330,
          height: 100,
          backgroundColor: "#e0ebe1",
          marginBottom: 15,
        }}
      >
        {editGender ? (
          <Select
            name="gender"
            value={selectedGender}
            onChange={handleChangeGender}
            placeholder="Select a gender"
            allowClear
          >
            {gender.map((item) => (
              <div key={item.title}>{item.title}</div>
            ))}
          </Select>
        ) : (
          <p>{data.data.gender}</p>
        )}
      </Card>
    </div>
  );
};

export default PatientCard;
