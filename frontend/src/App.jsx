import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/PatientAuth/PatientRegister";
import Login from "./pages/PatientAuth/PatientLogin";
import Dashboard from "./pages/PatientPages/Dashboard";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/patient",
    element: <Register/>,
  },
  {
    path: "/patient/login",
    element: <Login/>,
  },
  {
    path: "/patient/dashboard/:id",
    element: <Dashboard/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
