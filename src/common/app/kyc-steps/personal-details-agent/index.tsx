import CaptureImageComponent from "@/common/capture-image/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import React from "react";

export interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  homeAddress: string;
  modeOfIdentification: string;
  idCardFront: string;
  idCardBack: string;
  email: string;
  phoneNumber: string;
}

interface PersonalDetailsComponentProps {
  personalDetails: PersonalDetails;
  setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>;
}

const PersonalDetailsComponent: React.FC<PersonalDetailsComponentProps> = ({
  personalDetails,
  setPersonalDetails,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={"w-full bg-white rounded-md"}>
      <div className={"p-6 border-b border-gray-main"}>
        <h3 className={"text-lg font-medium"}>Personal Details</h3>
      </div>

      <div className={"p-6 grid grid-cols-12 gap-3"}>
        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"firstName"}
            required={true}
            label={"First Name"}
            defaultValue={personalDetails.firstName}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"middleName"}
            required={true}
            label={"Middle Name"}
            defaultValue={personalDetails.middleName}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"lastName"}
            required={true}
            label={"Last Name"}
            defaultValue={personalDetails.lastName}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            name={"email"}
            required={true}
            label={"Email"}
            defaultValue={personalDetails.email}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            name={"phoneNumber"}
            required={true}
            label={"Phone Number"}
            defaultValue={personalDetails.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12"}>
          <FormInputComponent
            name={"homeAddress"}
            required={true}
            label={"Home Address"}
            defaultValue={personalDetails.homeAddress}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12"}>
          <FormSelectComponent
            name={"modeOfIdentification"}
            required={true}
            label={"Mode Of Identification"}
            defaultValue={personalDetails.modeOfIdentification}
            onChange={handleChange}
          >
            <option>National Identification Card</option>
            <option>International Passport</option>
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <CaptureImageComponent
            label={"Front Side"}
            onCaptureImage={(imageDataURL) => {
              setPersonalDetails((prev) => ({
                ...prev,
                idCardFront: imageDataURL,
              }));
            }}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <CaptureImageComponent
            label={"Back Side"}
            onCaptureImage={(imageDataURL) => {
              setPersonalDetails((prev) => ({
                ...prev,
                idCardBack: imageDataURL,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsComponent;
