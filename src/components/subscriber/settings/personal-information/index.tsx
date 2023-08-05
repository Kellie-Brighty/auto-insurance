import ButtonComponent from "@/common/button/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import React from "react";

const SettingsPersonalInformationComponent = () => {
  return (
    <div className={"space-y-8"}>
      <span className={"text-2xl font-grotesk font-bold"}>
        Personal Information
      </span>
      <div className={"w-24 h-24 bg-gray-light rounded-full"} />
      <div className={"w-full grid grid-cols-12 gap-4"}>
        <div className={"col-span-6"}>
          <FormInputComponent label={"First Name"} />
        </div>
        <div className={"col-span-6"}>
          <FormInputComponent label={"Last Name"} />
        </div>
        <div className={"col-span-6"}>
          <FormInputComponent type={"email"} label={"Email"} />
        </div>
        <div className={"col-span-6"}>
          <FormInputComponent label={"Phone Number"} />
        </div>
        <div className={"col-span-12"}>
          <ButtonComponent size={"base"} variant={"filled"}>
            Edit Profile
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default SettingsPersonalInformationComponent;
