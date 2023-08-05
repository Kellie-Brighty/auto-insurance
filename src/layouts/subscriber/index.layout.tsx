import Image from "next/image";
import {
  BellIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const links = [
  {
    id: 1,
    Icon: <Squares2X2Icon className={"w-8 h-8"} />,
    label: "Overview",
    href: "/subscriber/overview",
  },
  {
    id: 2,
    Icon: <DocumentTextIcon className={"w-8 h-8"} />,
    label: "Policies",
    href: "/subscriber/policies",
  },
  {
    id: 3,
    Icon: <TruckIcon className={"w-8 h-8"} />,
    label: "Vehicles",
    href: "/subscriber/vehicles",
  },
  {
    id: 4,
    Icon: <ClipboardIcon className={"w-8 h-8"} />,
    label: "Claim",
    href: "/subscriber/claim",
  },
  {
    id: 5,
    Icon: <CreditCardIcon className={"w-8 h-8"} />,
    label: "Transactions",
    href: "/subscriber/transactions",
  },
  {
    id: 5,
    Icon: <Cog6ToothIcon className={"w-8 h-8"} />,
    label: "Settings",
    href: "/subscriber/settings/personal-information",
  },
];

interface SubscriberLayoutProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

const SubscriberLayout: React.FC<SubscriberLayoutProps> = ({
  title,
  caption,
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem("UserState");

    if (userType !== "Subscriber") {
      router.push("/auth/sign-in");
    }
  }, []);

  return (
    <div className={"w-full h-screen hidden lg:flex bg-background"}>
      <div
        className={
          "flex-shrink-0 w-1/5 max-w-sm h-full p-8 space-y-8 bg-white border-r border-gray-main overflow-auto"
        }
      >
        <div className={"w-full"}>
          <div
            style={{ aspectRatio: "322 / 58" }}
            className={"relative w-11/12 h-auto"}
          >
            <Image
              layout={"fill"}
              objectFit={"contain"}
              src={"/logo.png"}
              alt={"AutoFlex"}
            />
          </div>
        </div>

        <div className={"space-y-3"}>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`w-full p-3 flex items-center gap-2 ${
                router.pathname === link.href
                  ? "text-primary bg-background"
                  : "text-gray-dark"
              } rounded-md`}
            >
              {link.Icon}
              <span className={"font-medium"}>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={"flex-1 w-2/3 h-screen flex flex-col"}>
        <div
          className={
            "w-full p-6 flex items-center justify-between bg-white border-b border-gray-main"
          }
        >
          <div>
            <h1 className={"text-2xl font-grotesk font-bold"}>{title}</h1>
            <p className={"text-gray-dark"}>{caption}</p>
          </div>

          <div className={"flex items-center gap-3"}>
            <button>
              <BellIcon className={"w-8 h-8"} />
            </button>

            <button>
              <div className={"relative w-8 h-8 rounded-full"}>
                <Image
                  layout={"fill"}
                  objectFit={"cover"}
                  src={"/assets/subscriber/avatar.png"}
                  alt={"AutoFlex"}
                />
              </div>
            </button>
          </div>
        </div>

        <div className={"flex-1 h-full p-8 overflow-auto"}>{children}</div>
      </div>
    </div>
  );
};

export default SubscriberLayout;
