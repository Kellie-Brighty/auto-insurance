import FormFileInputComponent from "@/common/form-file-input/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import Image from "next/image";
import React from "react";

export interface VehicleDetails {
  vehicleName: string;
  vehicleYear: string;
  vehicleType: string;
  vehicleColor: string;
  vehicleWorth: string;
  plateNumber: string;
  engineNumber: string;
  chassisNumber: string;
  vehicleMedia: {
    dashboard: File | null;
    frontSide: File | null;
    leftSide: File | null;
    backSide: File | null;
    rightSide: File | null;
    video: File | null;
  };
  vehicleMediaURLs: {
    dashboard: string | null;
    frontSide: string | null;
    leftSide: string | null;
    backSide: string | null;
    rightSide: string | null;
    video: string | null;
  };
}

interface VehicleDetailsComponentProps {
  vehicleDetails: VehicleDetails;
  setVehicleDetails: React.Dispatch<React.SetStateAction<VehicleDetails>>;
}

const VehicleDetailsComponent: React.FC<VehicleDetailsComponentProps> = ({
  vehicleDetails,
  setVehicleDetails,
}) => {
  console.log(vehicleDetails);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVehicleDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehicleDetails((prev) => ({
          ...prev,
          vehicleMedia: {
            ...prev.vehicleMedia,
            [e.target.name]: file,
          },
          vehicleMediaURLs: {
            ...prev.vehicleMediaURLs,
            [e.target.name]: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={"w-full bg-white rounded-md"}>
        <div className={"p-6 border-b border-gray-main"}>
          <h3 className={"text-lg font-medium"}>Vehicle Details</h3>
        </div>

        <div className={"p-6 grid grid-cols-12 gap-3"}>
          <div className={"col-span-12 lg:col-span-6"}>
            <FormInputComponent
              name={"vehicleName"}
              required={true}
              label={"Which car do you own?"}
              defaultValue={vehicleDetails.vehicleName}
              onChange={handleChange}
            />
          </div>
          <div className={"col-span-12 lg:col-span-6"}>
            <FormInputComponent
              name={"vehicleWorth"}
              required={true}
              label={"Car value"}
              type="number"
              defaultValue={vehicleDetails.vehicleWorth}
              onChange={handleChange}
            />
          </div>

          <div className={"col-span-12 lg:col-span-4"}>
            <FormInputComponent
              type={"vehicleYear"}
              name={"vehicleYear"}
              required={true}
              label={"Year"}
              defaultValue={vehicleDetails.vehicleYear}
              onChange={handleChange}
            />
          </div>

          <div className={"col-span-12 lg:col-span-4"}>
            <FormSelectComponent
              name={"vehicleType"}
              required={true}
              label={"Vehicle Type"}
              defaultValue={vehicleDetails.vehicleType}
              onChange={handleChange}
            >
              <option value={"Toyota"}>Toyota</option>
              <option value={"Lexus"}>Lexus</option>
              <option value={"Mercedes"}>Mercedes</option>
            </FormSelectComponent>
          </div>

          <div className={"col-span-12 lg:col-span-4"}>
            <FormSelectComponent
              name={"vehicleColor"}
              required={true}
              label={"Vehicle Color"}
              defaultValue={vehicleDetails.vehicleColor}
              onChange={handleChange}
            >
              <option value={"Black"}>Black</option>
              <option value={"Blue"}>Blue</option>
              <option value={"Red"}>Red</option>
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
    </>
  );
};

export default VehicleDetailsComponent;
