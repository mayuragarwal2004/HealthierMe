import React from "react";
import Layout from "./Layout";
import { Outlet } from "react-router-dom";
import { useAuth } from "../components/context/auth/AuthState";

const NewUserLayout = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Layout
        footer={currentUser ? true : false}
        menu={currentUser ? true : false}
      >
        <Outlet />
      </Layout>
    </>
  );
};

export default NewUserLayout;
