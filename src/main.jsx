import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './layout/Home.jsx';
import "./Routes/PrivateRoute.jsx"
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import ForgotPassword from './component/ForgetPassword.jsx';
import AuthProvider from './Auth/AuthProvider.jsx';
import ErrorPage from './component/ErrorPage.jsx';
import Homepage from './layout/Homepage.jsx';
import PartnerProfiles from './component/PartnerProfiles.jsx';
import ProfileDetails from './component/ProfileDetails.jsx';
import CreateProfile from './component/CreateProfile.jsx';
import ExtraSections from './component/ExtraSections.jsx';
import MyConnections from './component/MyConnections.jsx';
import PrivateRoutes from './Routes/PrivateRoute.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: () => fetch("http://localhost:5000/top-rated"),
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
        element: <ForgotPassword />,
      },
      {
        path: "/AllPartnerProfile",
        loader: () => fetch("http://localhost:5000/AllPartnerProfile"),
        element: <PartnerProfiles />,
      },
      {
        path: "/createProfile",
        element: (
          <PrivateRoute>
            <CreateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/testimonials",
        loader: () => fetch("http://localhost:5000/testimonials"),
        element: <ExtraSections />,
      },
      {
        path: "/my-profiles",
        element: (
          <PrivateRoute>
            <MyConnections />
          </PrivateRoute>
        ),
      },
      {
        path: "/profileDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/profileDetails/${params.id}`),
        element: (
          <PrivateRoute>
            <ProfileDetails />
          </PrivateRoute>
        ),
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
