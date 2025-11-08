import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import CourseDetails from "../pages/CourseDetails";





export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/my-toys",
        element: (
          <PrivateRoute>
            {/* <MyToys /> */}
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            {/* <ProfilePage /> */}
          </PrivateRoute>
        ),
      },
      {
        path: "/about-us",
        // element: <AboutUs />,
      },
      {
        path: "/courses/:id",
        element: (
          <PrivateRoute>
            <CourseDetails/>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword/> ,
      },
      {
        path: "/terms",
        // element: <Terms/> ,
      },
      {
        path: "/policy",
        // element: <Policy/> ,
      },
    ],
  },
]);