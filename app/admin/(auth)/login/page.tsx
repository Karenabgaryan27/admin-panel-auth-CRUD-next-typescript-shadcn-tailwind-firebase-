"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { ButtonDemo, InputDemo } from "@/components/index";
import localData from "@/localData";
import useAlert from "@/hooks/alert/useAlert";
const { googleLogo } = localData.images;

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { successAlert } = useAlert();

  const { handleSignIn, handleSignInWithGoogle } = useAuthContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn({ email: state.email, password: state.password, setIsLoading });
  };

  
  useEffect(() => {
    const isSignedOut = sessionStorage.getItem("isSignedOut");
    if (isSignedOut) {
      setTimeout(() => successAlert("You’ve signed out successfully!"), 100);
      sessionStorage.removeItem('isSignedOut');
    }
  }, []);

  return (
    <div className="login-page min-h-[100vh] flex items-center justify-center ">
      <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px]">
        <form onSubmit={onSubmit} className="">
          <h2 className="text-2xl text-center mb-5">Login</h2>
          <InputDemo
            label="Email"
            placeholder="Email"
            name="email"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
          />
          <InputDemo
            label="Password"
            placeholder="Password"
            name="password"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
          />

          <Link href="/admin/forgot-password" className="text-xs mb-5 block text-blue-400 hover:underline">
            Forgot Password
          </Link>

          <ButtonDemo
            text={`${isLoading ? "Signing In..." : "Sign In"}`}
            className={`w-full mb-5 text-sm`}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 text-center mb-5">
            Don&apos;t have an account?{" "}
            <Link href="/admin/register" className="font-semibold text-[rgba(0,0,0,0.7)] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-full border-t border-gray-300"></div>
          <span className="text-gray-500 text-xs font-medium">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <ButtonDemo
          startIcon={<img src={googleLogo} className="h-[16px]" />}
          text={`${isLoading ? "Signing In..." : "Continue with Google"} `}
          className={`w-full text-sm text-gray-700 `}
          disabled={isLoading}
          variant="outline"
          onClick={() => handleSignInWithGoogle({})}
        />
      </div>
    </div>
  );
};

export default Login;
