import FormFileInputComponent from "@/common/form-file-input/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import Image from "next/image";
import React from "react";

export interface VehicleDetails {
  carName: string;
  year: string;
  carType: string;
  carColor: string;
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
    setVehicleDetails((prev) => ({
      ...prev,
      vehicleMedia: {
        ...prev.vehicleMedia,
        [e.target.name]: e.target.files?.[0],
      },
    }));
    console.log(e.target.files?.[0]);
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
              name={"carName"}
              required={true}
              label={"Which car do you own?"}
              defaultValue={vehicleDetails.carName}
              onChange={handleChange}
            />
          </div>

          <div className={"col-span-12 lg:col-span-4"}>
            <FormInputComponent
              type={"year"}
              name={"year"}
              required={true}
              label={"Year"}
              defaultValue={vehicleDetails.year}
              onChange={handleChange}
            />
          </div>

          <div className={"col-span-12 lg:col-span-4"}>
            <FormSelectComponent
              name={"carType"}
              required={true}
              label={"Vehicle Type"}
              defaultValue={vehicleDetails.carType}
              onChange={handleChange}
            >
              <option>Toyota</option>
              <option>Toyota</option>
              <option>Toyota</option>
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
              <option>Black</option>
              <option>Black</option>
              <option>Black</option>
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
                  {vehicleDetails.carName
                    ? `${vehicleDetails.carName}.mp4`
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
