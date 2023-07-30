import { useEffect, useMemo, useState } from "react";
import StepsComponent, { Step } from "@/common/steps/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import FormFileInputComponent from "@/common/form-file-input/index.component";
import SubscriberLayout from "@/layouts/subscriber/index.layout";
import ButtonComponent from "@/common/button/index.component";
import VehicleDetailsComponent, {
  VehicleDetails,
} from "@/common/app/vehicle-steps/vehicle-details";
import VehicleImageUploadsComponent from "@/common/app/vehicle-steps/VehicleUploads";
import UploadVehicleVideoComponent from "@/common/app/vehicle-steps/VehicleVideoUpload";

const SubscriberCreateVehicleComponent = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [state, setState] = useState({
    carName: "",
    carWorth: "",
    year: "",
    carType: "",
    carColor: "",
    plateNumber: "",
    chasisNumber: "",
    engineNumber: "",
  });

  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    vehicleName: "",
    vehicleYear: "",
    vehicleType: "",
    vehicleColor: "",
    plateNumber: "",
    engineNumber: "",
    chassisNumber: "",
    vehicleWorth: "",
    vehicleMedia: {
      dashboard: null,
      frontSide: null,
      leftSide: null,
      backSide: null,
      rightSide: null,
      video: null,
    },
    vehicleMediaURLs: {
      dashboard: null,
      frontSide: null,
      leftSide: null,
      backSide: null,
      rightSide: null,
      video: null,
    },
  });

  const handlePrevStep = () => {
    if (stepIndex && stepIndex > 1) {
      setSteps((prev) =>
        prev.map((step) =>
          step.stepIndex === stepIndex - 1
            ? { ...step, stepStatus: "in-progress" }
            : step.stepIndex === stepIndex
            ? { ...step, stepStatus: "pending" }
            : step
        )
      );

      setStepIndex(stepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (stepIndex && stepIndex < steps.length) {
      setSteps((prev) =>
        prev.map((step) =>
          step.stepIndex === stepIndex + 1
            ? { ...step, stepStatus: "in-progress" }
            : step.stepIndex === stepIndex
            ? { ...step, stepStatus: "completed" }
            : step
        )
      );

      setStepIndex(stepIndex + 1);
    }
  };

  // const VehicleDetailsComponent = useMemo(
  //   () =>
  //     function VehicleDetailsComponent() {
  //       return (
  //         <div className={"w-full bg-white rounded-md"}>
  //           <div className={"p-6 border-b border-gray-main"}>
  //             <h3 className={"text-lg font-medium"}>Vehicle Details</h3>
  //           </div>

  //           <div className={"p-6 grid grid-cols-12 gap-3"}>
  //             <div className={"col-span-12 lg:col-span-6"}>
  //               <FormInputComponent
  //                 name={"carName"}
  //                 required={true}
  //                 label={"Which car do you own?"}
  //                 value={state.carName}
  //                 onChange={(e) =>
  //                   setState({ ...state, carName: e.target.value })
  //                 }
  //               />
  //             </div>
  //             <div className={"col-span-12 lg:col-span-6"}>
  //               <FormInputComponent
  //                 name={"carWorth"}
  //                 required={true}
  //                 label={"What's the car worth?"}
  //                 type="number"
  //                 value={state.carWorth}
  //                 onChange={(e) =>
  //                   setState({ ...state, carWorth: e.target.value })
  //                 }
  //               />
  //             </div>

  //             <div className={"col-span-12 lg:col-span-4"}>
  //               <FormInputComponent
  //                 type={"year"}
  //                 name={"year"}
  //                 required={true}
  //                 label={"Year"}
  //                 value={state.year}
  //                 onChange={(e) => setState({ ...state, year: e.target.value })}
  //               />
  //             </div>

  //             <div className={"col-span-12 lg:col-span-4"}>
  //               <FormSelectComponent
  //                 name={"carType"}
  //                 required={true}
  //                 label={"Vehicle Type"}
  //                 value={state.carType}
  //                 onChange={(e) =>
  //                   setState({ ...state, carType: e.target.value })
  //                 }
  //               >
  //                 <option value={"Toyota"}>Toyota</option>
  //                 <option value={"Mercedes"}>Mercedes</option>
  //                 <option value={"Lexus"}>Lexus</option>
  //               </FormSelectComponent>
  //             </div>

  //             <div className={"col-span-12 lg:col-span-4"}>
  //               <FormSelectComponent
  //                 name={"carColor"}
  //                 required={true}
  //                 label={"Vehicle Color"}
  //                 value={state.carColor}
  //                 onChange={(e) =>
  //                   setState({ ...state, carColor: e.target.value })
  //                 }
  //               >
  //                 <option value={"Black"}>Black</option>
  //                 <option value={"Red"}>Red</option>
  //                 <option value={"Blue"}>Blue</option>
  //               </FormSelectComponent>
  //             </div>

  //             <div className={"col-span-12 lg:col-span-4"}>
  //               <FormInputComponent
  //                 name={"plateNumber"}
  //                 required={true}
  //                 label={"Plate Number"}
  //                 value={state.plateNumber}
  //                 onChange={(e) =>
  //                   setState({ ...state, plateNumber: e.target.value })
  //                 }
  //               />
  //             </div>

  //             <div className={"col-span-12 lg:col-span-4"}>
  //               <FormInputComponent
  //                 name={"engineNumber"}
  //                 required={true}
  //                 label={"Engine Number"}
  //                 value={state.engineNumber}
  //                 onChange={(e) =>
  //                   setState({ ...state, engineNumber: e.target.value })
  //                 }
  //               />
  //             </div>

  //             <div className={"col-span-12 lg:col-span-4"}>
  //               <FormInputComponent
  //                 name={"chassisNumber"}
  //                 required={true}
  //                 label={"Chassis Number"}
  //                 value={state.chasisNumber}
  //                 onChange={(e) =>
  //                   setState({ ...state, chasisNumber: e.target.value })
  //                 }
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     },
  //   []
  // );

  // const UploadVehicleImagesComponent = useMemo(
  //   () =>
  //     function UploadVehicleImagesComponent() {
  //       return (
  //         <div className={"w-full bg-white rounded-md"}>
  //           <div className={"p-6 border-b border-gray-main"}>
  //             <h3 className={"text-lg font-medium"}>Upload Vehicle Images</h3>
  //           </div>

  //           <div className={"p-6 grid grid-cols-12 items-start gap-3"}>
  //             <div
  //               className={
  //                 "col-span-12 xl:col-span-6 p-6 space-y-3 border border-gray-main rounded-md"
  //               }
  //             >
  //               <FormFileInputComponent label={"Vehicle Dashboard"} />
  //               <FormFileInputComponent label={"Vehicle Front Side"} />
  //               <FormFileInputComponent label={"Vehicle Left Side"} />
  //               <FormFileInputComponent label={"Vehicle Back Side"} />
  //               <FormFileInputComponent label={"Vehicle Right Side"} />
  //             </div>

  //             <div className={"col-span-12 xl:col-span-6 space-y-3"}>
  //               <div
  //                 className={
  //                   "w-full p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
  //                 }
  //               >
  //                 <div className={"col-span-12 flex flex-col gap-1"}>
  //                   <span className={"text-sm text-gray-dark"}>Car Name</span>
  //                   <span className={"text-2xl font-grotesk font-bold"}>
  //                     2023 Toyota Avalon Xl
  //                   </span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>Year</span>
  //                   <span className={"font-grotesk font-bold"}>2023</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Vehicle Type
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>Toyota</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Vehicle Color
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>Black</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Plate Number
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>KJA193AA</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Engine Number
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>52WVC10338</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Chassis Number
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>
  //                     JYA2UJE0X2A050036
  //                   </span>
  //                 </div>
  //               </div>

  //               <div
  //                 className={
  //                   "w-full p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
  //                 }
  //               >
  //                 <div
  //                   className={
  //                     "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
  //                   }
  //                 />

  //                 <div
  //                   className={
  //                     "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
  //                   }
  //                 />

  //                 <div
  //                   className={
  //                     "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
  //                   }
  //                 />

  //                 <div
  //                   className={
  //                     "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
  //                   }
  //                 />

  //                 <div
  //                   className={
  //                     "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
  //                   }
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     },
  //   []
  // );

  // const UploadVehicleVideoComponent = useMemo(
  //   () =>
  //     function UploadVehicleVideoComponent() {
  //       return (
  //         <div className={"w-full bg-white rounded-md"}>
  //           <div className={"p-6 border-b border-gray-main"}>
  //             <h3 className={"text-lg font-medium"}>Upload Vehicle Video</h3>
  //           </div>

  //           <div className={"p-6 grid grid-cols-12 items-start gap-3"}>
  //             <div
  //               className={
  //                 "col-span-12 xl:col-span-6 p-6 space-y-3 border border-gray-main rounded-md"
  //               }
  //             >
  //               <FormFileInputComponent label={"Vehicle Video"} />
  //             </div>

  //             <div className={"col-span-12 xl:col-span-6 space-y-3"}>
  //               <div
  //                 className={
  //                   "w-full p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
  //                 }
  //               >
  //                 <div className={"col-span-12 flex flex-col gap-1"}>
  //                   <span className={"text-sm text-gray-dark"}>Car Name</span>
  //                   <span className={"text-2xl font-grotesk font-bold"}>
  //                     2023 Toyota Avalon Xl
  //                   </span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>Year</span>
  //                   <span className={"font-grotesk font-bold"}>2023</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Vehicle Type
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>Toyota</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Vehicle Color
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>Black</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Plate Number
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>KJA193AA</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Engine Number
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>52WVC10338</span>
  //                 </div>

  //                 <div
  //                   className={"col-span-12 lg:col-span-4 flex flex-col gap-1"}
  //                 >
  //                   <span className={"text-sm text-gray-dark"}>
  //                     Chassis Number
  //                   </span>
  //                   <span className={"font-grotesk font-bold"}>
  //                     JYA2UJE0X2A050036
  //                   </span>
  //                 </div>
  //               </div>

  //               <div
  //                 className={
  //                   "col-span-12 xl:col-span-6 p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
  //                 }
  //               >
  //                 <div
  //                   className={
  //                     "col-span-3 h-auto aspect-square bg-gray-light rounded-md"
  //                   }
  //                 />

  //                 <div className={"col-span-9 space-y-3"}>
  //                   <div className={"col-span-12 flex flex-col gap-1"}>
  //                     <span className={"text-sm text-gray-dark"}>
  //                       Video URL
  //                     </span>
  //                     <span className={"text-primary truncate"}>
  //                       https://www.pexels.com/search/videos/car/
  //                     </span>
  //                   </div>

  //                   <div className={"col-span-12 flex flex-col gap-1"}>
  //                     <span className={"text-sm text-gray-dark"}>
  //                       File Name
  //                     </span>
  //                     <span className={"font-grotesk font-bold"}>
  //                       Toyota.mp4
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     },
  //   []
  // );

  const StepSwitch = useMemo(
    () =>
      function StepSwitch() {
        switch (stepIndex) {
          case 1:
            return (
              <VehicleDetailsComponent
                vehicleDetails={vehicleDetails}
                setVehicleDetails={setVehicleDetails}
              />
            );
          case 2:
            return (
              <VehicleImageUploadsComponent
                vehicleDetails={vehicleDetails}
                setVehicleDetails={setVehicleDetails}
              />
            );
          case 3:
            return (
              <UploadVehicleVideoComponent
                vehicleDetails={vehicleDetails}
                setVehicleDetails={setVehicleDetails}
              />
            );
        }
      },
    [
      stepIndex,
      VehicleDetailsComponent,
      VehicleImageUploadsComponent,
      UploadVehicleVideoComponent,
    ]
  );

  useEffect(() => {
    setSteps([
      {
        stepIndex: 1,
        stepLabel: "Vehicle Information",
        stepStatus: "in-progress",
      },
      {
        stepIndex: 2,
        stepLabel: "Upload Vehicle Images",
        stepStatus: "pending",
      },
      {
        stepIndex: 3,
        stepLabel: "Upload Vehicle Videos",
        stepStatus: "pending",
      },
      {
        stepIndex: 4,
        stepLabel: "Payment",
        stepStatus: "pending",
      },
    ]);
    setStepIndex(1);
  }, []);

  return (
    <SubscriberLayout
      title={"New Vehicle Insurance"}
      caption={"Provide your vehicle details and make payment to proceed."}
    >
      <div className={"space-y-8"}>
        <StepsComponent steps={steps} />
        <StepSwitch />

        <div className={"flex items-center justify-end gap-3"}>
          <ButtonComponent
            size={"base"}
            variant={"outlined"}
            onClick={handlePrevStep}
          >
            Go Back
          </ButtonComponent>
          <ButtonComponent
            size={"base"}
            variant={"filled"}
            onClick={handleNextStep}
          >
            Next Step
          </ButtonComponent>
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default SubscriberCreateVehicleComponent;
