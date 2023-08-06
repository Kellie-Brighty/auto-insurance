import ButtonComponent from "@/common/button/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import React from "react";

const SettingsChangePasswordsComponent = () => {
  return (
    <div>
      <div className={"space-y-8"}>
        <span className={"text-2xl font-grotesk font-bold"}>
          Change Password
        </span>

        <div className={"w-full grid grid-cols-12 gap-4"}>
          <div className={"col-span-12"}>
            <FormInputComponent type={"password"} label={"Old Password"} />
          </div>
          <div className={"col-span-12"}>
            <FormInputComponent type={"password"} label={"New Password"} />
          </div>
          <div className={"col-span-12"}>
            <FormInputComponent type={"password"} label={"Confirm Password"} />
          </div>
          <div className={"col-span-12"}>
            <ButtonComponent size={"base"} variant={"filled"}>
              Change Password
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsChangePasswordsComponent;
