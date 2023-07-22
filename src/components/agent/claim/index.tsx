import FormInputComponent from "@/common/form-input/index.component";
import {
  ClipboardIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ButtonComponent from "@/common/button/index.component";
import React from "react";
import AgentLayout from "@/layouts/agent/index.layout";

const AgentClaimComponent = () => {
  return (
    <AgentLayout title={"Claim"} caption={"View and manage your claims"}>
      <div className={"w-full bg-white rounded-md overflow-auto"}>
        <div className={"p-6 border-b border-gray-main"}>
          <h3 className={"text-lg font-medium"}>Search Claim</h3>
        </div>

        <div
          className={
            "h-full p-16 flex flex-col items-center justify-center gap-8"
          }
        >
          <h1 className={"text-4xl font-grotesk font-bold"}>
            Hi, Paulinus Offorzor
          </h1>

          <div className={"max-w-lg flex flex-col gap-3 text-center"}>
            <h3 className={"text-2xl font-grotesk font-bold"}>
              Search for your claim by the following:
            </h3>

            <span className={"text-gray-dark"}>
              Policy Number, Plate Number, Color, Engine Number, Chassis Number,
              Name of the Car, Phone Number etc.
            </span>
          </div>

          <div className={"flex items-center justify-center gap-3"}>
            <FormInputComponent
              Icon={<MagnifyingGlassIcon className={"w-5 h-5"} />}
              placeholder={"Start your search..."}
            />

            <ButtonComponent size={"base"} variant={"filled"}>
              Search Claim
            </ButtonComponent>
          </div>

          <div className={"flex items-center justify-center gap-3"}>
            <ButtonComponent size={"base"} variant={"ghost"}>
              <div className={"flex items-center justify-center gap-2"}>
                <ClipboardIcon className={"w-5 h-5"} />
                <span>View Claim</span>
              </div>
            </ButtonComponent>

            <ButtonComponent size={"base"} variant={"ghost"}>
              <div className={"flex items-center justify-center gap-2"}>
                <ClipboardIcon className={"w-5 h-5"} />
                <span>View Policy</span>
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentClaimComponent;
