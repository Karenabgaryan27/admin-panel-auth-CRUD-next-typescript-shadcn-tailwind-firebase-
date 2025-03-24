"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, InputDemo, BreadcrumbDemo } from "@/components/index";

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Update Profile",
  },
];

const UpdateProfile = () => {
  const [state, setState] = useState({ email: "", password: "", repeatPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { handleUpdatePassword, handleUpdateEmail, currentUser } = useAuthContext();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (state.email && state.email !== currentUser?.email) {
      await handleUpdateEmail({ email: state.email });
    }
    if (state.password) {
      await handleUpdatePassword({ password: state.password });
    }
    setState({ email: "", password: "", repeatPassword: "" });
    setIsLoading(false);
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
    <main className="p-5">
      <h2 className="text-2xl mb-3">Update Profile</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />

      <div className="update-profile-page  flex items-center justify-center ">
        <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px]">
          <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto">
            <h2 className="text-2xl text-center mb-5">Update Profile</h2>

            <InputDemo
              label="Email"
              placeholder="Email"
              name="email"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.email}
            />

            <InputDemo
              label="Password"
              placeholder="Leave blank to keep the same"
              name="password"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.password}
            />
            <InputDemo
              label="Repeat Password"
              placeholder="Leave blank to keep the same"
              name="repeatPassword"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.repeatPassword}
            />

            <ButtonDemo
              text={`${isLoading ? "Updating..." : "Update"}`}
              className={`w-full mb-5 text-sm`}
              disabled={isLoading || error}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;
