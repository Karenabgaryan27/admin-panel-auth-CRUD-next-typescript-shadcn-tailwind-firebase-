"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, InputDemo, BreadcrumbDemo } from "@/components/index";
import localData from "@/localData";

const { googleLogo } = localData.images;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Account",
  },
];

const Account = () => {
  const { handleLinkEmailPasswordAccount, currentUser, handleSignInWithGoogle } = useAuthContext();
  const [isEmailPasswordMethodEnabled, setIsEmailPasswordMethodEnabled] = useState(false);
  const [isGoogleSignInMethodEnabled, setIsGoogleSignInMethodEnabled] = useState(false);
  const [state, setState] = useState({ password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    handleLinkEmailPasswordAccount({ email: currentUser.email, password: state.password, setIsLoading });
  };

  useEffect(() => {
    if (!currentUser) return;
    const _isEmailPasswordMethodEnabled = currentUser.providerData.find(
      (item) => item.providerId === "password"
    );
    if (_isEmailPasswordMethodEnabled) setIsEmailPasswordMethodEnabled(true);

    const _isGoogleSignInMethodEnabled = currentUser.providerData.find(
      (item) => item.providerId === "google.com"
    );
    if (_isGoogleSignInMethodEnabled) setIsGoogleSignInMethodEnabled(true);
  }, [currentUser]);
  return (
    <main className="p-5">
      <h2 className="text-2xl mb-3">Account</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />
      <br />

      <div className="email-password-login-method   flex flex-wrap gap-5 ">
        <div className="min-h-[200px] flex-1 min-w-[300px] max-w-[400px]  p-3 bg-gray-50 dark:bg-secondary rounded-lg">
          <h2 className="text-1xl mb-5 text-sm font-bold">Email/password login method:</h2>
          {isEmailPasswordMethodEnabled ? (
            <span className="text-success text-sm">Enabled</span>
          ) : (
            <div className="wrapper  w-full max-w-[360px]  shadow-lg !p-5 border border-gray-100 rounded-[15px]">
              <form onSubmit={onSubmit} className="m-5 ">
                <h2 className="text-2xl text-center mb-5">Enable Email Login by Setting a Password</h2>
                <InputDemo
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type="text"
                  callback={(e) => onChange(e)}
                  className="mb-5"
                />

                <ButtonDemo
                  text={`${isLoading ? "Loading..." : "Add Password"}`}
                  className={`w-full mb-5 text-sm`}
                  disabled={isLoading}
                />
              </form>
            </div>
          )}
        </div>

        <div className="min-h-[200px] flex-1 min-w-[300px] max-w-[400px] p-3 bg-gray-50 dark:bg-secondary rounded-lg">
          <h2 className="text-1xl mb-5 text-sm font-bold">Google sign in method:</h2>
          {isGoogleSignInMethodEnabled ? (
            <span className="text-success text-sm">Enabled</span>
          ) : (
            <ButtonDemo
              startIcon={<img src={googleLogo} className="h-[16px]" />}
              text={`${isLoading ? "Signing In..." : "Continue with Google"} `}
              className={`w-full text-sm text-gray-700 `}
              disabled={isLoading}
              variant="outline"
              onClick={() => handleSignInWithGoogle({})}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Account;
