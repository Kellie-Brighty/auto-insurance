import CaptureImageComponent from "@/common/capture-image/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import React from "react";

export interface PersonalDetails {
  firstname: string;
  middlename: string;
  lastname: string;
  homeAddress: string;
  id_type: string;
  idCardFront: any;
  idCardBack: any;
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
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value.toUpperCase(), // Convert value to uppercase
    }));
    console.log(personalDetails);
  };

  return (
    <div className={"w-full bg-white rounded-md"}>
      <div className={"p-6 border-b border-gray-main"}>
        <h3 className={"text-lg font-medium"}>Personal Details</h3>
      </div>

      <div className={"p-6 grid grid-cols-12 gap-3"}>
        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"firstname"}
            required={true}
            label={"First Name"}
            defaultValue={personalDetails.firstname}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"middlename"}
            required={true}
            label={"Middle Name"}
            defaultValue={personalDetails.middlename}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"lastname"}
            required={true}
            label={"Last Name"}
            defaultValue={personalDetails.lastname}
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
            name={"id_type"}
            required={true}
            label={"Mode Of Identification"}
            defaultValue={personalDetails.id_type}
            onChange={handleChange}
          >
            <option>Select here</option>
            <option value={"National Identification Card"}>
              National Identification Card
            </option>
            <option value={"International Passport"}>
              International Passport
            </option>
            <option value={"Driver License"}>Driver License</option>
            <option value={"Voter Card"}>Voter&apos; Card</option>
            <option value={"Passport Photograph"}>Passport Photograph</option>
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
