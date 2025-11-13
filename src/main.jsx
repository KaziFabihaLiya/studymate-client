import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router"; // Fixed: Single import from react-router-dom
import Home from "./layout/Home.jsx";
import "./Routes/PrivateRoute.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import ForgotPassword from "./component/ForgetPassword.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import ErrorPage from "./component/ErrorPage.jsx";
import Homepage from "./layout/Homepage.jsx";
import PartnerProfiles from "./component/PartnerProfiles.jsx";
import ProfileDetails from "./component/ProfileDetails.jsx";
import CreateProfile from "./component/CreateProfile.jsx";
import ExtraSections from "./component/ExtraSections.jsx";
import MyConnections from "./component/MyConnections.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx"; // Fixed: Single import
import UpdateProfile from "./component/UpdateProfile.jsx";
import Profile from "./component/Profile.jsx";
import api from "./utils/api"; // Add this import (adjust path if needed)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: async () => {
          const { data } = await api.get("/top-rated");
          return data;
        },
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
        loader: async () => {
          const { data } = await api.get("/AllPartnerProfile");
          return data;
        },
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
        loader: async () => {
          const { data } = await api.get("/testimonials");
          return data;
        },
        element: <ExtraSections />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/profileDetails/:id",
        loader: async ({ params }) => {
          const { data } = await api.get(`/profileDetails/${params.id}`);
          return data;
        },
        element: (
          <PrivateRoute>
            <ProfileDetails />
          </PrivateRoute>
        ),
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
        path: "/update-partner/:id",
        loader: async ({ params }) => {
          const { data } = await api.get(`/profileDetails/${params.id}`);
          return data;
        },
        element: (
          <PrivateRoute>
            <UpdateProfile />
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
