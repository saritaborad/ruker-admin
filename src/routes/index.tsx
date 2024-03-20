import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LandingPage from "./../pages/LandingPage";
import PATH from "././path";
import DashBoard from "./../Components/dashboard/DashBoard";
import PrivateGuard from "./../guards/PrivateGuard";
import Users from "./../Components/dashboard/Users";
import Spaces from "./../Components/dashboard/Spaces";
import UserDashBoard from "./../Components/dashboard/UserDashBoard";
// import SignUpPage from "./../pages/SignUpPage";
// import AuthGuard from "./../guards/AuthGuard";

// const PrivateRoute = ({ children }: any) => {
//   const isAuthenticated = localStorage.getItem("token");

//   return isAuthenticated ?  children : <Navigate to="/" />;
// };

const checkAuthentication = () => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    <Navigate to={PATH.root} />;
  }
};

export const AdminRoutes = () => {
  useEffect(() => {
    // Check authentication on initial render
    checkAuthentication();
  }, []);

  // return (
  //   <Routes>
  //     <Route path={PATH.root} element={<LandingPage />} />

  //     <Route path={PATH.forgotPassword} element={<LandingPage />} />
  //   </Routes>
  // );
  let element = useRoutes([
    {
      path: PATH.root,
      element: <LandingPage />,
    },
    // {
    //   path: PATH.login,
    //   element: <SignUpPage />,
    // },
    {
      path: PATH.forgotPassword,
      element: <LandingPage />,
    },
    {
      path: PATH.resetPassword,
      element: <LandingPage />,
    },
    {
      path: PATH.newPassword,
      element: <LandingPage />,
    },
    {
      path: PATH.twoFactorAuth,
      element: <PrivateGuard children={<LandingPage />} />,
    },
    {
      path: PATH.verifyMFACode,
      element: <PrivateGuard children={<LandingPage />} />,
      // element: <LandingPage />,
    },
    {
      path: PATH.dashBoard,
      element: <PrivateGuard children={<DashBoard />} />,
      children: [
        {
          path: "",
          element: <UserDashBoard />,
        },
        {
          path: "users",
          element: <Users />,
        },
        { path: "spaces", element: <Spaces/> },
      ],
    },
 
    {
      path: PATH.notFound,
      element: <div>not found</div>,
    },
  ]);

  return element;
};

export default AdminRoutes;
