import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Login = lazy(() => import("../Pages/Login"));
import Pageloading from "../Components/Pageloading";
import Navbar from "../Layouts/Navbar";
import GlobalWrapper from "../Layouts/GlobalWrapper";
import AdminWrapper from "../Layouts/AdminWrapper";
const Notfound = lazy(() => import("../Components/NotFound"));
const Signup = lazy(() => import("../Pages/SignUp"));
const Product = lazy(() => import("../Pages/Admin/Product"));
const Addproduct = lazy(() => import("../Pages/Admin/Addproduct"));
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard"));
const Landing = lazy(() => import("../Pages/Landing"));
import ErrorBoundary from "../Components/ErrorBoundary";
import ProtectedRoute from "../Components/ProtectedRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalWrapper />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Pageloading />}>
            <Landing />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Pageloading />}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Pageloading />}>
        <Signup />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "product",
            element: (
              <Suspense fallback={<Pageloading />}>
                <Product />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "addproduct",
            element: (
              <Suspense fallback={<Pageloading />}>
                <Addproduct />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path:"editproduct/:id",
            element: (
              <Suspense fallback={<Pageloading />}>
                <Addproduct />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<Pageloading />}>
                <Dashboard />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "*",
            element: (
              <Suspense fallback={<Pageloading />}>
                <Notfound />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Pageloading />}>
        <Notfound />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
]);

export default Router;
