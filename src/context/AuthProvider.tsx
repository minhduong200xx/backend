"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../types/type";
import { mutate } from "swr";
import { useAppContext } from "./AppProvider";

interface AuthContextType {
  user: User | undefined;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  getAuth: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const { messageApi } = useAppContext();
  const logIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log(response.data);
      if (response.data?.user) {
        setUser(response.data.user);
        Cookies.set("accessToken", response.data.accessToken, { expires: 7 });
        Cookies.set("refreshToken", response.data.refreshToken, { expires: 7 });
        messageApi.success("You have successfully logged in.");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign-in failed", error);
      throw new Error("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };
  const getAuth = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      if (response.data?.user) {
        setUser(response.data.user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw new Error("Not logged in");
    } finally {
      setLoading(false);
      mutate("/api/auth/me");
    }
  };
  useEffect(() => {
    getAuth();
  }, []);
  const logOut = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      setUser(undefined);
      Cookies.remove("accessToken");
      messageApi.success("You have successfully logged out.");
    } catch (error) {
      throw new Error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logIn, logOut, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
