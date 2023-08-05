import {
  CreditCardIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SettingsLayoutComponent = () => {
  const router = useRouter();

  const settingsSidebarLinks = [
    {
      Icon: <UserIcon className={"w-8 h-8"} />,
      title: "Personal Information",
      href: "/subscriber/settings/personal-information",
      caption: "Manage your personal information.",
    },
    {
      Icon: <LockClosedIcon className={"w-8 h-8"} />,
      title: "Change Passwords",
      href: "/subscriber/settings/change-passwords",
      caption: "Manage your passwords.",
    },
    {
      Icon: <CreditCardIcon className={"w-8 h-8"} />,
      title: "Payments",
      href: "/subscriber/settings/payments",
      caption: "Set up and manage your direct debit.",
    },
    {
      Icon: <PhoneIcon className={"w-8 h-8"} />,
      title: "Support",
      href: "/subscriber/settings/support",
      caption: "Get help from our service.",
    },
  ];

  return (
    <div className={"py-8 border-r border-r-gray-200"}>
      {settingsSidebarLinks.map(({ Icon, title, caption, href }) => (
        <Link
          key={title}
          href={href}
          className={`py-4 px-8 flex items-center gap-2 ${
            router.asPath === href
              ? "bg-gray-light border-l-4 border-l-primary"
              : ""
          }`}
        >
          {Icon}
          <div className={"flex flex-col"}>
            <span className={"text-lg font-medium"}>{title}</span>
            <span className={"text-gray-dark"}>{caption}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SettingsLayoutComponent;
