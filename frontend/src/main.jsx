import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ShowUsers from "./Pages/ShowUsers.jsx";
import AddUser from "./Pages/AddUser.jsx";
import EditUser from "./Pages/EditUser.jsx";
import SingleUser from "./Pages/SingleUser.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <ShowUsers />,
  },
  {
    path: "/adduser",
    element: <AddUser />,
  },
  {
    path: "/edituser/:userId",
    element: <EditUser />,
  },
  {
    path: "/user/:userId",
    element: <SingleUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
