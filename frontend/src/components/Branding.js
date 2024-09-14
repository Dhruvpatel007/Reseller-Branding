import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Branding = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <Header />
      {auth.isAuthenticated && (
        <>
          <div align="center">
            <h1>Welcome, {auth.user.user.name}</h1>
            {auth.user.user.client === "reseller" ? (
              <h1>Reseller Branding !!!</h1>
            ) : (
              <h1>SharkStriker Branding !!!</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Branding;
