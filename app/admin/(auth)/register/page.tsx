"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, InputDemo } from "@/components/index";
import Link from "next/link";
import localData from "@/localData";
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

const Register = () => {
  const [state, setState] = useState({ email: "", password: "", repeatPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignUp, handleSignInWithGoogle } = useAuthContext();

    const { validateSignUp } = useJoiValidation();
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
    const { error } = validateSignUp(state);
    console.log(error, ' jjj')
    if (!error) {
      handleSignUp({ email: state.email, password: state.password, setIsLoading });
      console.log("Submit");
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateSignUp(state)), [state]);

  useEffect(() => {
    if (!wasSubmitted) return;
    const errors: Record<string, string> = {};
    result?.error?.details.forEach((item) => {
      if (errors[item.path[0]]) return;
      errors[item.path[0]] = item.message;
    });
    setErrorMessages(errors);
  }, [result, wasSubmitted]);

  return (
    <div className="register-page min-h-[100vh] flex items-center justify-center ">
      <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px]">
        <form onSubmit={onSubmit} className={`${wasSubmitted ? "was-submitted" : ""} m-5 max-w-[360px] mx-auto`}>
          <h2 className="text-2xl text-center mb-5">Register</h2>

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
          <InputDemo
            label="Repeat Password"
            placeholder="Repeat Password"
            name="repeatPassword"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            errorMessage={errorMessages.repeatPassword}
            inputClassName={errorMessages.repeatPassword ? "is-invalid" : "is-valid"}
          />

          <ButtonDemo
            text={`${isLoading ? "Signing Up..." : "Sign Up"}`}
            className={`w-full mb-5 text-sm`}
            // disabled={isLoading || error}
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
