import React, { useEffect, useState } from "react";
import { SignIn } from "../pages/signin";

interface Props {
  children: React.ReactNode;
}

export const AuthProvide: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState("");

  const updateToken = () => {
    const newCookies: string[] = document.cookie
      ? document.cookie.split(";")
      : [];

    if (newCookies && newCookies.length) {
      setToken(
        newCookies.find((item) => item.includes("token="))?.split("=")[1] || ""
      );
    }
  };

  useEffect(() => {
    updateToken();
  }, []);

  setInterval(() => {
    updateToken();
  }, 10);

  return <div>{token.length ? children : <SignIn />}</div>;
};
