import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
// import NoPage from "./components/NoPage";
// import AuthState from "./components/context/auth/AuthContext";
// import RequireAuth from "./components/RequireAuth";
import EditChallenge from "./pages/UpdateActivityStatus";
import { Form } from "./pages/Form";
import LoginSignUp from "./pages/LoginSignUp";
import NoPage from "./pages/NoPage";
import RequireAuth from "./components/user/RequireAuth";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Community from "./components/Form/Community";
import AllAdminCommunities from "./components/admin/AllAdminCommunities";
import AdminHome from "./components/admin/AdminHome";
import JoinCommunity from "./pages/JoinCommunity";
import NewUserLayout from "./pages/NewUserLayout";

function AdminRoutes() {
  console.log(process.env.REACT_APP_TEST_ID)
  return (
    <>
      <BrowserRouter>
        <div className="home-container">
          <Routes>
            {/* Auth Routes */}
            <Route path="login" element={<Outlet />}>
              <Route index element={<LoginPage />} />
              <Route path=":id" element={<LoginPage />} />
            </Route>
            <Route path="signup" element={<Outlet />}>
              <Route index element={<SignUpPage />} />
              <Route path=":id" element={<SignUpPage />} />
            </Route>

            <Route path="/" element={<NewUserLayout />}>
              <Route path="join/:id" element={<JoinCommunity />} />
            </Route>

            {/* Layout Routes */}
            <Route path="/" element={<Layout />}>
              {/* Join Community Routes */}

              {/* Routes Required User Authentication */}
              <Route path="" element={<RequireAuth />}>
                {/* User Routes */}
                <Route index element={<Home />} />
                <Route path="edit" element={<EditChallenge />} />
                <Route path="join" element={<JoinCommunity />} />

                {/* Admin Routes */}
                <Route path="admin" element={<Outlet />}>
                  <Route index element={<AdminHome />} />
                  <Route path="createcommunity" element={<Community />} />
                  <Route path="form" element={<Form />} />
                </Route>
              </Route>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default AdminRoutes;
