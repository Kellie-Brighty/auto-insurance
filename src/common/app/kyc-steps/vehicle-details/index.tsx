import FormFileInputComponent from "@/common/form-file-input/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import Image from "next/image";
import React from "react";
import VehicleJson from "./carmodelb.json";
import ColorJson from "./colors.json";

export interface VehicleDetails {
  vehicleName: string;
  vehicleYear: string;
  vehicleType: string;
  vehicleColor: string;
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
          <div className={"col-span-12 lg:col-span-12"}>
            <FormInputComponent
              name={"vehicleName"}
              required={true}
              label={"Which car do you own?"}
              defaultValue={vehicleDetails.vehicleName}
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
              <option value="">Select a vehicle</option>
              {VehicleJson.map((vehicle) => (
                <option key={vehicle.Abadal} value={vehicle.Abadal}>
                  {vehicle.Abadal}
                </option>
              ))}
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
              <option value="">Select a color</option>
              {ColorJson.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
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

      <div className={"w-full bg-white rounded-md"}>
        <div className={"p-6 border-b border-gray-main"}>
          <h3 className={"text-lg font-medium"}>Upload Vehicle Images</h3>
        </div>

        <div className={"p-6 grid grid-cols-12 items-start gap-3"}>
          <div
            className={
              "col-span-12 xl:col-span-6 p-6 space-y-3 border border-gray-main rounded-md"
            }
          >
            <FormFileInputComponent
              name={"dashboard"}
              label={"Vehicle Dashboard"}
              onChange={handleFileChange}
            />
            <FormFileInputComponent
              name={"frontSide"}
              label={"Vehicle Front Side"}
              onChange={handleFileChange}
            />
            <FormFileInputComponent
              name={"leftSide"}
              label={"Vehicle Left Side"}
              onChange={handleFileChange}
            />
            <FormFileInputComponent
              name={"backSide"}
              label={"Vehicle Back Side"}
              onChange={handleFileChange}
            />
            <FormFileInputComponent
              name={"rightSide"}
              label={"Vehicle Right Side"}
              onChange={handleFileChange}
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
                  {vehicleDetails.vehicleName || "NA"}
                </span>
              </div>

              <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
                <span className={"text-sm text-gray-dark"}>Year</span>
                <span className={"font-grotesk font-bold"}>
                  {vehicleDetails.vehicleYear || "NA"}
                </span>
              </div>

              <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
                <span className={"text-sm text-gray-dark"}>Vehicle Type</span>
                <span className={"font-grotesk font-bold"}>
                  {vehicleDetails.vehicleType || "NA"}
                </span>
              </div>

              <div className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}>
                <span className={"text-sm text-gray-dark"}>Vehicle Color</span>
                <span className={"font-grotesk font-bold"}>
                  {vehicleDetails.vehicleColor || "NA"}
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
                "w-full p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
              }
            >
              {vehicleDetails.vehicleMediaURLs.dashboard ? (
                <div
                  className={
                    "relative col-span-6 lg:col-span-3 h-auto aspect-square rounded-md overflow-hidden"
                  }
                >
                  <Image
                    layout={"fill"}
                    objectFit={"cover"}
                    src={vehicleDetails.vehicleMediaURLs.dashboard}
                    alt={"AutoFlex"}
                  />
                </div>
              ) : (
                <div
                  className={
                    "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                  }
                />
              )}

              {vehicleDetails.vehicleMediaURLs.frontSide ? (
                <div
                  className={
                    "relative col-span-6 lg:col-span-3 h-auto aspect-square rounded-md overflow-hidden"
                  }
                >
                  <Image
                    layout={"fill"}
                    objectFit={"cover"}
                    src={vehicleDetails.vehicleMediaURLs.frontSide}
                    alt={"AutoFlex"}
                  />
                </div>
              ) : (
                <div
                  className={
                    "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                  }
                />
              )}

              {vehicleDetails.vehicleMediaURLs.leftSide ? (
                <div
                  className={
                    "relative col-span-6 lg:col-span-3 h-auto aspect-square rounded-md overflow-hidden"
                  }
                >
                  <Image
                    layout={"fill"}
                    objectFit={"cover"}
                    src={vehicleDetails.vehicleMediaURLs.leftSide}
                    alt={"AutoFlex"}
                  />
                </div>
              ) : (
                <div
                  className={
                    "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                  }
                />
              )}

              {vehicleDetails.vehicleMediaURLs.backSide ? (
                <div
                  className={
                    "relative col-span-6 lg:col-span-3 h-auto aspect-square rounded-md overflow-hidden"
                  }
                >
                  <Image
                    layout={"fill"}
                    objectFit={"cover"}
                    src={vehicleDetails.vehicleMediaURLs.backSide}
                    alt={"AutoFlex"}
                  />
                </div>
              ) : (
                <div
                  className={
                    "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                  }
                />
              )}

              {vehicleDetails.vehicleMediaURLs.rightSide ? (
                <div
                  className={
                    "relative col-span-6 lg:col-span-3 h-auto aspect-square rounded-md overflow-hidden"
                  }
                >
                  <Image
                    layout={"fill"}
                    objectFit={"cover"}
                    src={vehicleDetails.vehicleMediaURLs.rightSide}
                    alt={"AutoFlex"}
                  />
                </div>
              ) : (
                <div
                  className={
                    "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={"w-full bg-white rounded-md"}>
        <div className={"p-6 border-b border-gray-main"}>
          <h3 className={"text-lg font-medium"}>Upload Vehicle Vidoe</h3>
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
    </>
  );
};

export default VehicleDetailsComponent;
