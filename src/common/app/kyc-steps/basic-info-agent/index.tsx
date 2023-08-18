import CaptureImageComponent from "@/common/capture-image/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import React from "react";
import vehicleJson from "../vehicle-details/carmodelb.json";
import yearJson from "../vehicle-details/year.json";
import ButtonComponent from "@/common/button/index.component";

export interface BasicInfoDetails {
  vehicleName: string;
  vehicleYear: string;
  vehicleWorth: number;
  email: string;
  phoneNumber: string;
}

interface PersonalDetailsComponentProps {
  basicInfoDetails: BasicInfoDetails;
  setBasicInfoDetails: React.Dispatch<React.SetStateAction<BasicInfoDetails>>;
}

const BasicInfoComponent: React.FC<PersonalDetailsComponentProps> = ({
  basicInfoDetails,
  setBasicInfoDetails,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBasicInfoDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={"w-full bg-white rounded-md"}>
      <div className={"p-6 border-b border-gray-main"}>
        <h3 className={"text-lg font-medium"}>Get Estimate</h3>
      </div>

      <div className={"p-6 grid grid-cols-12 gap-3"}>
        <div className={"col-span-12 lg:col-span-12"}>
          <FormSelectComponent
            name={"vehicleName"}
            required={true}
            label={"Which car do you own?"}
            value={basicInfoDetails.vehicleName}
            onChange={handleChange}
            style={{ maxHeight: 200, overflowY: "auto" }}
          >
            <option value="">Select a vehicle</option>
            {vehicleJson.map((vehicle) => (
              <option key={vehicle.Abadal} value={vehicle.Abadal}>
                {vehicle.Abadal}
              </option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormSelectComponent
            name={"vehicleYear"}
            required={true}
            label={"Year"}
            value={basicInfoDetails.vehicleYear}
            onChange={handleChange}
          >
            <option value="">Select your car year</option>
            {yearJson.map((year) => (
              <option key={year.value} value={year.value}>
                {year.value}
              </option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"number"}
            name={"vehicleWorth"}
            required={true}
            label={"Estimated Car Worth"}
            value={basicInfoDetails.vehicleWorth}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"email"}
            name={"email"}
            required={true}
            label={"Email"}
            value={basicInfoDetails.email}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"text"}
            name={"phoneNumber"}
            required={true}
            label={"Phone Number"}
            value={basicInfoDetails.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoComponent;
