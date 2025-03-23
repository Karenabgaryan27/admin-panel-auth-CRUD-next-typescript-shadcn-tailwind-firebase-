"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, InputDemo } from "@/components/index";
import Link from "next/link";
import useJoiValidation from "@/hooks/joi-validation/useJoiValidation";

type ValidationResult = {
  error?: {
    details: {
      path: string[];
      message: string;
    }[];
  };
};

const Login = () => {
  const { handleResetPassword } = useAuthContext();
  const [state, setState] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { validateResetPassword } = useJoiValidation();
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
    const { error } = validateResetPassword(state);
    if (!error) {
      handleResetPassword({ email: state.email, setIsLoading });
      console.log("Submit");
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateResetPassword(state)), [state]);

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
    <div className="login-page min-h-[100vh] flex items-center justify-center ">
      <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px]">
        <form onSubmit={onSubmit} className={`m-5 max-w-[360px] mx-auto ${wasSubmitted ? "was-submitted" : ""}`}>
          <h2 className="text-2xl text-center mb-5">Reset Password</h2>
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

          <ButtonDemo
            text={`${isLoading ? "Loading..." : "Reset Password"}`}
            className={`w-full mb-5 text-sm`}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 text-center mb-5">
            Back to{" "}
            <Link href="/admin/login" className="font-semibold text-[rgba(0,0,0,0.7)] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
