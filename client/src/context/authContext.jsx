import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  // console.log(currentUser);
  const login = async (input) => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const resBody = await res.json();
    if (res.ok) setCurrentUser(resBody);
    // setCurrentUser(resBody);
    if (!res.ok) return resBody;
  };

  const logout = async () => {
    const res = await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(),
    });
    const resBody = await res.json();
    console.log(resBody);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export  { AuthContext };
export default AuthContextProvider;