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
import Page404 from "pages/404";
import CollectionDetails from "pages/CollectionDetails";
import CategoryForm from "pages/CategoryForm";
import NftDetails from "pages/NftDetails";
import Reports from "pages/Reports";

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
        path: "/collection/:id",
        element: <CollectionDetails />,
      },
      {
        path: "/nfts",
        element: <Nfts />,
      },
      {
        path: "/nft/:id",
        element: <NftDetails />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/category/form",
        element: <CategoryForm />,
      },
      {
        path: "/category/form/:id",
        element: <CategoryForm />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ServerError />,
  },
  {
    path: "*",
    element: <Page404 />,
    errorElement: <ServerError />,
  },
]);

export default router;
