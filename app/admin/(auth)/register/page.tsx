"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, InputDemo } from "@/components/index";
import Link from "next/link";
import localData from "@/localData";

const { googleLogo } = localData.images;

const Register = () => {
  const [state, setState] = useState({ email: "", password: "", repeatPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { handleSignUp, handleSignInWithGoogle } = useAuthContext();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp({ email: state.email, password: state.password, setIsLoading });
    
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (state.password !== state.repeatPassword) {
      setError(true);
    } else {
      setError(false);
    }
  }, [state]);

  return (
    <div className="register-page min-h-[100vh] flex items-center justify-center ">
      <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px]">
        <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto">
          <h2 className="text-2xl text-center mb-5">Register</h2>

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
          <InputDemo
            label="Repeat Password"
            placeholder="Repeat Password"
            name="repeatPassword"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
          />

          <ButtonDemo
            text={`${isLoading ? "Signing Up..." : "Sign Up"}`}
            className={`w-full mb-5 text-sm`}
            disabled={isLoading || error}
          />
          <p className="text-xs text-gray-500 text-center mb-5">
            Already have an account?{" "}
            <Link href="/admin/login" className="font-semibold text-[rgba(0,0,0,0.7)] hover:underline">
              Sign In
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

export default Register;
