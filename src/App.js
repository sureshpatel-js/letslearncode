import logo from './logo.svg';
import './App.css';
import Login from './pages/nonAuthUserPages/login/Login';
import Signup from "./pages/nonAuthUserPages/signup/Signup";
import 'react-notifications/lib/notifications.css';
import OtpVerify from './pages/nonAuthUserPages/otpverify/OtpVerify';
import ForgotPassword from './pages/nonAuthUserPages/forgotPassword/ForgotPassword';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/authUserPages/home/Home';
import Courses from './pages/authUserPages/courses/Courses';
import MyCourses from './pages/authUserPages/myCourses/MyCourses';
import CoursesDetail from './pages/authUserPages/courses/CoursesDetail';
import LandingPage from "./pages/nonAuthUserPages/landingPage/LandingPage";
import LandingPageCourseView from './pages/nonAuthUserPages/landingPage/LandingPageCoursesView';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "",
        element: <LandingPageCourseView />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "otpVerify",
        element: <OtpVerify />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
    ]
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "coursesDetail/:id",
        element: <CoursesDetail />,
      },
      {
        path: "myCourses",
        element: <MyCourses />
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
