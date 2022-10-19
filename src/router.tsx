import { createBrowserRouter, Link, redirect } from "react-router-dom";
import Layout from "./components/Layouts";
import Categories from "./pages/Categories";
import Collections from "./pages/Collections";
import Home from "./pages/Home";
import KycApplications from "./pages/KycApplications";
import Login from "./pages/Login";
import Nfts from "./pages/Nfts";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

import { store } from "./app/store";
import { isLoggedIn } from "./app/account/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import ServerError from "./components/ServerError";
import UserDetails from "pages/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ServerError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/user/:id",
        element: <UserDetails />,
      },
      {
        path: "/KYC-applications",
        element: <KycApplications />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/nfts",
        element: <Nfts />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ServerError />,
  },
]);

export default router;
