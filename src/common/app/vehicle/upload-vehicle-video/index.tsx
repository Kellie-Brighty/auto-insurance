import { VehicleDetails } from "@/common/app/vehicle/vehicle-details";
import FormFileInputComponent from "@/common/form-file-input/index.component";
import uploadFileToFirebaseStorage from "@/utils/firebase/uploadFileToFirebaseStorage";
import { uuidv4 } from "@firebase/util";
import React from "react";

export interface VehicleVideoDetails {
  video: string;
}

interface UploadVehicleVideoComponentProps {
  vehicleVideoDetails: VehicleVideoDetails;
  setVehicleVideoDetails: React.Dispatch<
    React.SetStateAction<VehicleVideoDetails>
  >;
  vehicleDetails: VehicleDetails;
}

const UploadVehicleVideoComponent: React.FC<
  UploadVehicleVideoComponentProps
> = ({ vehicleVideoDetails, setVehicleVideoDetails, vehicleDetails }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.files[0]) {
      const fileURL = await uploadFileToFirebaseStorage(
        e.target.files[0],
        `${uuidv4()}.${e.target.files[0].name.split(".")[1]}`,
      );

      setVehicleVideoDetails((prev) => ({
        ...prev,
        [e.target.name]: fileURL,
      }));
    }
  };

  return (
    <div className={"w-full bg-white rounded-md"}>
      <div className={"p-6 border-b border-gray-main"}>
        <h3 className={"text-lg font-medium"}>Upload Vehicle Video</h3>
      </div>

      <div className={"p-6 grid grid-cols-12 items-start gap-3"}>
        <div
          className={
            "col-span-12 xl:col-span-6 p-6 space-y-3 border border-gray-main rounded-md"
          }
        >
          <FormFileInputComponent
            name={"video"}
            label={"Vehicle Video"}
            onChange={handleChange}
          />
        </div>

        <div className={"col-span-12 xl:col-span-6 space-y-3"}>
          <div
            className={
              "w-full p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
            }
          >
            <div className={"col-span-12 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Car Name</span>
              <span className={"text-2xl font-grotesk font-bold"}>
                {vehicleDetails.carName || "NA"}
              </span>
            </div>

            <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Year</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.year || "NA"}
              </span>
            </div>

            <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Vehicle Type</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.carType || "NA"}
              </span>
            </div>

            <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Vehicle Color</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.carColor || "NA"}
              </span>
            </div>

            <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Plate Number</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.plateNumber || "NA"}
              </span>
            </div>

            <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Engine Number</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.engineNumber || "NA"}
              </span>
            </div>

            <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Chassis Number</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.chassisNumber || "NA"}
              </span>
            </div>
          </div>

          <div
            className={
              "col-span-12 xl:col-span-6 p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
            }
          >
            <div
              className={
                "col-span-3 h-auto aspect-square bg-gray-light rounded-md"
              }
            />

            <div className={"col-span-9 space-y-3"}>
              <div className={"col-span-12 flex flex-col gap-1"}>
                <span className={"text-sm text-gray-dark"}>Video URL</span>
                <span className={"text-primary truncate"}>
                  {vehicleVideoDetails.video}
                </span>
              </div>

              <div className={"col-span-12 flex flex-col gap-1"}>
                <span className={"text-sm text-gray-dark"}>File Name</span>
                <span className={"font-grotesk font-bold"}>
                  {vehicleDetails.carName}.mp4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVehicleVideoComponent;
