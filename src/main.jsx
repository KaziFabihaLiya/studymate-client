import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './layout/Home.jsx';
import { AuthProvider } from './Auth/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        index: true,
        path: "/",
        element: <App/>,
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
