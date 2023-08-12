import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  title: string;
  caption?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  caption,
  children,
}) => {
  return (
    <div className={"hidden lg:flex"}>
      <div
        className={"w-1/3 max-w-lg max-h-screen p-8 space-y-8 overflow-auto"}
      >
        <div className={"relative w-[310px] h-[56px]"}>
          <Link href="/">
            <Image
              layout={"fill"}
              objectFit={"contain"}
              src={"/logo.png"}
              alt={"AutoFlex"}
            />
          </Link>
        </div>

        <div className={"space-y-6"}>
          <div>
            <h1 className={"text-2xl font-grotesk font-bold"}>{title}</h1>
            {caption && <p className={"text-gray-dark"}>{caption}</p>}
          </div>

          <div>{children}</div>
        </div>
      </div>

      <div
        className={"flex-1 h-screen"}
        style={{
          backgroundImage: "url('/assets/auth/cover.png')",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default AuthLayout;
