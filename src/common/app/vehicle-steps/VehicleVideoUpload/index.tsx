import FormFileInputComponent from "@/common/form-file-input/index.component";
import React from "react";
import { VehicleDetails } from "@/common/app/vehicle-steps/vehicle-details/index";

interface VehicleDetailsComponentProps {
  vehicleDetails: VehicleDetails;
  setVehicleDetails: React.Dispatch<React.SetStateAction<VehicleDetails>>;
}

const UploadVehicleVideoComponent: React.FC<VehicleDetailsComponentProps> = ({
  vehicleDetails,
  setVehicleDetails,
}) => {
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
            onChange={handleFileChange}
          />
        </div>

        <div
          className={
            "col-span-12 xl:col-span-6 p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
          }
        >
          <div className={"col-span-9 space-y-3"}>
            <div className={"col-span-12 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>Video URL</span>
              <span className={"text-primary truncate"}>
                {vehicleDetails.vehicleMediaURLs.video || "NA"}
              </span>
            </div>

            <div className={"col-span-12 flex flex-col gap-1"}>
              <span className={"text-sm text-gray-dark"}>File Name</span>
              <span className={"font-grotesk font-bold"}>
                {vehicleDetails.vehicleMedia.video
                  ? `${vehicleDetails.vehicleMedia.video.name}`
                  : "NA"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVehicleVideoComponent;
