"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

type InputDemoProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  inputClassName?: string;
  label?: ReactNode;
  callback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  // successMessage?: string;
};

export function InputDemo({
  className = "",
  inputClassName = "",
  label = "",
  callback = () => {},
  // successMessage = "looks good",
  errorMessage = "",
  ...props
}: InputDemoProps) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(uuidv4());
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e);
  };

  return (
    <div className={`field grid items-center gap-1.5 ${className}`}>
      {label && <Label htmlFor={id} className=" font-medium">{label}</Label>}
      <Input
        id={id}
        {...props}
        onChange={onChange}
        className={`${inputClassName} `}
      />
      {/* <div className="valid-feedback text-green-600 text-sm">{successMessage}</div> */}
      <div className="invalid-feedback text-red-600 text-xs">{errorMessage}</div>
    </div>
  );
}
