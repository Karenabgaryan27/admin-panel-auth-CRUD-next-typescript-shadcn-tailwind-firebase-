"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { ButtonDemo, InputDemo } from "@/components/index";
import localData from "@/localData";
import useAlert from "@/hooks/alert/useAlert";
import useJoiValidation from '@/hooks/joi-validation/useJoiValidation'
const { googleLogo } = localData.images;

type ValidationResult = {
  error?: {
    details: {
      path: string[];
      message: string;
    }[];
  };
};

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { successAlert } = useAlert();
  const { handleSignIn, handleSignInWithGoogle } = useAuthContext();

  const { validateSignIn } = useJoiValidation();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [result, setResult] = useState<ValidationResult>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = validateSignIn(state);
    if (!error) {
      handleSignIn({ email: state.email, password: state.password, setIsLoading });
      console.log("Submit");
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateSignIn(state)), [state]);

  useEffect(() => {
    if (!wasSubmitted) return;
    const errors: Record<string, string> = {};
    result?.error?.details.forEach((item) => {
      if (errors[item.path[0]]) return;
      errors[item.path[0]] = item.message;
    });
    setErrorMessages(errors);
  }, [result, wasSubmitted]);

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
        <form onSubmit={onSubmit} className={`${wasSubmitted ? "was-submitted" : ""}`}>
          <h2 className="text-2xl text-center mb-5">Login</h2>
          <InputDemo
            label="Email"
            placeholder="Email"
            name="email"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            errorMessage={errorMessages.email}
            inputClassName={errorMessages.email ? "is-invalid" : "is-valid"}
          />
          <InputDemo
            label="Password"
            placeholder="Password"
            name="password"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            errorMessage={errorMessages.password}
            inputClassName={errorMessages.password ? "is-invalid" : "is-valid"}
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
