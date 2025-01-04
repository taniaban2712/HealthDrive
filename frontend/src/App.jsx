import React from "react";
import { useNavigate } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/PatientAuth/PatientRegister";
import Login from "./pages/PatientAuth/PatientLogin";
import Dashboard from "./pages/PatientPages/Dashboard";
import LandingPage from "./pages/LandingPage";

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const token = sessionStorage.getItem("authToken"); // Check if user is logged in (token present)
//   const id= sessionStorage.getItem("id");

//   return (
//     <Route
//       {...rest}
//       element={
//         token ? (
//           <Navigate to={`/patient/dashboard/${id}`} /> // Redirect if logged in (to dashboard)
//         ) : (
//           <Component /> // Render the component if not logged in
//         )
//       }
//     />
//   );
// };

const token = sessionStorage.getItem("authToken"); // Check if user is logged in (token present)
const id = sessionStorage.getItem("id");

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/patient",
    element: <Register />,
  },
  {
    path: "/patient/login",
    element: <Login />,
  },
  {
    path: "/patient/dashboard",
    element: id? <Navigate to={`/patient/dashboard/${id}`} />: <Navigate to="/patient/login" />,
  },
  {
    path: "/patient/dashboard/:id",
    element: <Dashboard />,
  },
]);

function App() {
  // const token = sessionStorage.getItem("authToken"); // Check if user is logged in (token present)
  // const id = sessionStorage.getItem("id");
  // const navigate= useNavigate()

  // useEffect(() => {
  //   if (token && id) {
  //     navigate(`/patient/dashboard/${id}`);
  //   }
  //   else{
  //     navigate('/patient/login');
  //   }
  // }, [token, id,navigate]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
