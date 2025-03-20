"use client";

import React, { ReactElement,ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const buttonStyles = {
  default: {
    primary: "",
    // success: "bg-green-600 hover:bg-green-500",
    success: "bg-success hover:bg-success-hover",
    // warning: "bg-yellow-600 hover:bg-yellow-500",
    warning: "bg-warning hover:bg-warning-hover",
  },
  secondary: {
    primary: "",
    success: "bg-green-50 hover:bg-green-100 text-green-600",
    warning: "bg-yellow-50 hover:bg-yellow-100 text-yellow-600",
  },
  outline: {
    primary: "",
    success: "text-green-600 hover:text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50",
    warning:
      "text-yellow-600 hover:text-yellow-600 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50",
  },
  ghost: {
    primary: "",
    success: "text-green-600 hover:text-green-600 hover:bg-green-50",
    warning: "text-yellow-600 hover:text-yellow-600 hover:bg-yellow-50",
  },
  destructive: {
    primary: "",
    success: "bg-red-600 hover:bg-red-500",
    warning: "bg-orange-600 hover:bg-orange-500",
  },
  link: {
    primary: "",
    success: "text-green-600 hover:text-green-500",
    warning: "text-yellow-600 hover:text-yellow-500",
  },
};

type ButtonDemoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  text?: ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  icon?: ReactElement | null;
  startIcon?: ReactElement | null;
  endIcon?: ReactElement | null;
  color?: "primary" | "success" | "warning";
  disabled?: boolean;
  onClick?: () => void;
};

export function ButtonDemo({
  className = "",
  text = "",
  variant = "default",
  size = "default",
  icon = null,
  startIcon = null,
  endIcon = null,
  color = "primary",
  disabled = false,
  onClick = () => {},
  ...props
}: ButtonDemoProps) {
  const [buttonStyle, setButtonStyle] = useState("");

  useEffect(() => {
    const buttonStylesVariant = buttonStyles[variant];

    if (buttonStylesVariant) {
      const buttonStylesColor = buttonStylesVariant[color];
      setButtonStyle(buttonStylesColor);
    }
  }, []);

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      className={`${className} ${buttonStyle}`}
      onClick={onClick}
      {...props}
    >
      {startIcon}
      {text}
      {icon}
      {endIcon}
      {/* <div data-type={type}></div> */}
    </Button>
  );
}
