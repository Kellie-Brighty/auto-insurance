import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import React from "react";
import VehicleJson from "./carmodelb.json";
import YearJson from "./year.json";

export interface VehicleDetails {
  carName: string;
  carWorth: number;
  year: string;
  carType: string;
  carColor: string;
  plateNumber: string;
  engineNumber: string;
  chassisNumber: string;
}

interface VehicleDetailsComponentProps {
  vehicleDetails: VehicleDetails;
  setVehicleDetails: React.Dispatch<React.SetStateAction<VehicleDetails>>;
}

const VehicleDetailsComponent: React.FC<VehicleDetailsComponentProps> = ({
  vehicleDetails,
  setVehicleDetails,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVehicleDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={"w-full bg-white rounded-md"}>
      <div className={"p-6 border-b border-gray-main"}>
        <h3 className={"text-lg font-medium"}>Vehicle Details</h3>
      </div>

      <div className={"p-6 grid grid-cols-12 gap-3"}>
        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            name={"carName"}
            required={true}
            label={"Which car do you own?"}
            defaultValue={vehicleDetails.carName}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"number"}
            name={"carWorth"}
            required={true}
            label={"What's the car worth?"}
            defaultValue={vehicleDetails.carWorth}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormSelectComponent
            name={"year"}
            required={true}
            label={"Year"}
            defaultValue={vehicleDetails.year}
            onChange={handleChange}
          >
            <option>Choose vehicle year</option>
            {YearJson.map((year) => (
              <option key={year.value} value={year.value}>
                {year.value}
              </option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormSelectComponent
            name={"carType"}
            required={true}
            label={"Vehicle Type"}
            defaultValue={vehicleDetails.carType}
            onChange={handleChange}
          >
            <option>Choose your vehicle type</option>
            {VehicleJson.map((vehicle) => (
              <option key={vehicle.Abadal} value={vehicle.Abadal}>
                {vehicle.Abadal}
              </option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormSelectComponent
            name={"carColor"}
            required={true}
            label={"Vehicle Color"}
            defaultValue={vehicleDetails.carColor}
            onChange={handleChange}
          >
            <option value={"Black"}>Black</option>
            <option value={"Red"}>Red</option>
            <option value={"Blue"}>Blue</option>
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"plateNumber"}
            required={true}
            label={"Plate Number"}
            defaultValue={vehicleDetails.plateNumber}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"engineNumber"}
            required={true}
            label={"Engine Number"}
            defaultValue={vehicleDetails.engineNumber}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            name={"chassisNumber"}
            required={true}
            label={"Chassis Number"}
            defaultValue={vehicleDetails.chassisNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsComponent;
