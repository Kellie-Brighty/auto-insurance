import React from "react";
import Lottie from "lottie-react";
import Loading from "../../../public/assets/loading.json";

interface ButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "base";
  variant: "filled" | "outlined" | "ghost";
  fullWidth?: boolean;
  children: React.ReactNode;
  loading?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  size,
  variant,
  fullWidth,
  children,
  loading,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`${fullWidth ? "w-full" : ""} ${
        size === "sm" ? "py-1 px-3" : size === "base" ? "py-3 px-6" : ""
      } font-medium ${
        variant === "filled"
          ? "text-white bg-primary"
          : variant === "outlined"
          ? "text-primary border-2 border-primary"
          : variant === "ghost"
          ? "text-primary bg-primary bg-opacity-5"
          : ""
      } rounded-md h-[50px] flex justify-center items-center`}
    >
      {loading ? (
        <Lottie
          animationData={Loading}
          loop={true}
          className={`w-[50px] h-[50px]`}
        />
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default ButtonComponent;
