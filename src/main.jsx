import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './layout/Home.jsx';

import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import ForgotPassword from './component/ForgetPassword.jsx';
import AuthProvider from './Auth/AuthProvider.jsx';
import ErrorPage from './component/ErrorPage.jsx';
import Homepage from './layout/Homepage.jsx';
import PartnerProfiles from './component/PartnerProfiles.jsx';
import ProfileDetails from './component/ProfileDetails.jsx';
import CreateProfile from './component/CreateProfile.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>,
      },
      {
        path: "/AllPartnerProfile",
        loader: () => fetch("http://localhost:5000/AllPartnerProfile"),
        element: <PartnerProfiles/>,
      },
      {
        path: "/createProfile",
        element: <CreateProfile/>,
      },
      {
        path: "/profileDetails/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/profileDetails/${params.id}`),
        element: <ProfileDetails/>,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
