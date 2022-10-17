import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "./components/Layouts";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <div>
            <h1>Hello World</h1>
            <Link to="about">About Us</Link>
          </div>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
