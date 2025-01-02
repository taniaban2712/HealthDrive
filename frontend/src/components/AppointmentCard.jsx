import React from 'react'

const AppointmentCard = (appointment) => {
    console.log('appointmentcarddata',appointment)
  return (
    <div>{appointment.appointment.patientName}</div>
  )
}

export default AppointmentCard