import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

function PrivateRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth.user ? (
        <>
          <ProfileProvider>
            <PostProvider>
              <Header />
              <main className="mx-auto max-w-[1020px] py-8">
                <div className="container">
                  <Outlet />
                </div>
              </main>
            </PostProvider>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
