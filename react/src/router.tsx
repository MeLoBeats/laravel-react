import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {Dashboard, Login, Signup, User, UserForm} from "./pages";
import NotFound from "./pages/NotFound";
import { DefaultLayout, GuestLayout } from "./components";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={"/users"} />
      },
      {
        path: "/users",
        element: <User />
      },
      {
        path: "/user/new",
        element: <UserForm key="userCreate" />
      },
      {
        path: "/user/:id",
        element: <UserForm key="userUpdate" />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
    ]
  },{
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]

export default createBrowserRouter(routes)
