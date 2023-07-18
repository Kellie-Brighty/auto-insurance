import SubscriberLayout from "@/layouts/subscriber/index.layout";
import StepsComponent, { Step } from "@/common/steps/index.component";
import { useEffect, useMemo, useState } from "react";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import CaptureImageComponent from "@/common/capture-image/index.component";
import ButtonComponent from "@/common/button/index.component";
import FormFileInputComponent from "@/common/form-file-input/index.component";
import { TruckIcon } from "@heroicons/react/24/outline";

const SubscriberKycStepsComponent = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const handlePrevStep = () => {
    if (stepIndex) {
      setSteps((prev) =>
        prev.map((step) =>
          step.stepIndex === stepIndex - 1
            ? { ...step, stepStatus: "in-progress" }
            : step.stepIndex === stepIndex
            ? { ...step, stepStatus: "pending" }
            : step,
        ),
      );

      setStepIndex(stepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (stepIndex) {
      setSteps((prev) =>
        prev.map((step) =>
          step.stepIndex === stepIndex + 1
            ? { ...step, stepStatus: "in-progress" }
            : step.stepIndex === stepIndex
            ? { ...step, stepStatus: "completed" }
            : step,
        ),
      );

      setStepIndex(stepIndex + 1);
    }
  };

  const PersonalDetailsComponent = useMemo(
    () =>
      function PersonalDetailsComponent() {
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
                />
              </div>

              <div className={"col-span-12 lg:col-span-4"}>
                <FormInputComponent
                  name={"middleName"}
                  required={true}
                  label={"Middle Name"}
                />
              </div>

              <div className={"col-span-12 lg:col-span-4"}>
                <FormInputComponent
                  name={"lastName"}
                  required={true}
                  label={"Last Name"}
                />
              </div>

              <div className={"col-span-12"}>
                <FormInputComponent
                  name={"homeAddress"}
                  required={true}
                  label={"Home Address"}
                />
              </div>

              <div className={"col-span-12"}>
                <FormSelectComponent
                  name={"modeOfIdentification"}
                  required={true}
                  label={"Mode Of Identification"}
                >
                  <option>National Identification Card</option>
                  <option>National Identification Card</option>
                  <option>National Identification Card</option>
                </FormSelectComponent>
              </div>

              <div className={"col-span-12 lg:col-span-6"}>
                <CaptureImageComponent
                  label={"Front Side"}
                  onCaptureImage={() => {}}
                />
              </div>

              <div className={"col-span-12 lg:col-span-6"}>
                <CaptureImageComponent
                  label={"Back Side"}
                  onCaptureImage={() => {}}
                />
              </div>
            </div>
          </div>
        );
      },
    [],
  );

  const VehicleDetailsComponent = useMemo(
    () =>
      function VehicleDetailsComponent() {
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
                  />
                </div>

                <div className={"col-span-12 lg:col-span-4"}>
                  <FormInputComponent
                    type={"year"}
                    name={"year"}
                    required={true}
                    label={"Year"}
                  />
                </div>

                <div className={"col-span-12 lg:col-span-4"}>
                  <FormSelectComponent
                    name={"carType"}
                    required={true}
                    label={"Vehicle Type"}
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
                  />
                </div>

                <div className={"col-span-12 lg:col-span-4"}>
                  <FormInputComponent
                    name={"engineNumber"}
                    required={true}
                    label={"Engine Number"}
                  />
                </div>

                <div className={"col-span-12 lg:col-span-4"}>
                  <FormInputComponent
                    name={"chassisNumber"}
                    required={true}
                    label={"Chassis Number"}
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
                  <FormFileInputComponent label={"Vehicle Dashboard"} />
                  <FormFileInputComponent label={"Vehicle Front Side"} />
                  <FormFileInputComponent label={"Vehicle Left Side"} />
                  <FormFileInputComponent label={"Vehicle Back Side"} />
                  <FormFileInputComponent label={"Vehicle Right Side"} />
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
                        2023 Toyota Avalon Xl
                      </span>
                    </div>

                    <div
                      className={
                        "col-span-12 lg:col-span-4 flex flex-col gap-1"
                      }
                    >
                      <span className={"text-sm text-gray-dark"}>Year</span>
                      <span className={"font-grotesk font-bold"}>2023</span>
                    </div>

                    <div
                      className={
                        "col-span-12 lg:col-span-4 flex flex-col gap-1"
                      }
                    >
                      <span className={"text-sm text-gray-dark"}>
                        Vehicle Type
                      </span>
                      <span className={"font-grotesk font-bold"}>Toyota</span>
                    </div>

                    <div
                      className={
                        "col-span-12 lg:col-span-4 flex flex-col gap-1"
                      }
                    >
                      <span className={"text-sm text-gray-dark"}>
                        Vehicle Color
                      </span>
                      <span className={"font-grotesk font-bold"}>Black</span>
                    </div>

                    <div
                      className={
                        "col-span-12 lg:col-span-4 flex flex-col gap-1"
                      }
                    >
                      <span className={"text-sm text-gray-dark"}>
                        Plate Number
                      </span>
                      <span className={"font-grotesk font-bold"}>KJA193AA</span>
                    </div>

                    <div
                      className={
                        "col-span-12 lg:col-span-4 flex flex-col gap-1"
                      }
                    >
                      <span className={"text-sm text-gray-dark"}>
                        Engine Number
                      </span>
                      <span className={"font-grotesk font-bold"}>
                        52WVC10338
                      </span>
                    </div>

                    <div
                      className={
                        "col-span-12 lg:col-span-4 flex flex-col gap-1"
                      }
                    >
                      <span className={"text-sm text-gray-dark"}>
                        Chassis Number
                      </span>
                      <span className={"font-grotesk font-bold"}>
                        JYA2UJE0X2A050036
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      "w-full p-6 grid grid-cols-12 gap-3 border border-gray-main rounded-md"
                    }
                  >
                    <div
                      className={
                        "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                      }
                    />

                    <div
                      className={
                        "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                      }
                    />

                    <div
                      className={
                        "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                      }
                    />

                    <div
                      className={
                        "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                      }
                    />

                    <div
                      className={
                        "col-span-6 lg:col-span-3 h-auto aspect-square bg-gray-light rounded-md"
                      }
                    />
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
                  <FormFileInputComponent label={"Vehicle Video"} />
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
                      <span className={"text-sm text-gray-dark"}>
                        Video URL
                      </span>
                      <span className={"text-primary truncate"}>
                        https://www.pexels.com/search/videos/car/
                      </span>
                    </div>

                    <div className={"col-span-12 flex flex-col gap-1"}>
                      <span className={"text-sm text-gray-dark"}>
                        File Name
                      </span>
                      <span className={"font-grotesk font-bold"}>
                        Toyota.mp4
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    [],
  );

  const PaymentDetailsComponent = useMemo(
    () =>
      function PaymentDetailsComponent() {
        return (
          <div className={"w-full bg-white rounded-md"}>
            <div className={"p-6 border-b border-gray-main"}>
              <h3 className={"text-lg font-medium"}>Payment Details</h3>
            </div>

            <div className={"p-6 grid grid-cols-12 gap-3"}>
              <div
                className={
                  "relative col-span-12 xl:col-span-6 p-6 space-y-6 text-white bg-secondary rounded-md"
                }
              >
                <div
                  className={
                    "absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-32 h-48 rounded-full bg-white opacity-25 blur-2xl"
                  }
                />

                <div className={"space-y-3"}>
                  <div className={"flex flex-col"}>
                    <span>Selected Plan</span>
                    <span className={"text-2xl font-grotesk font-bold"}>
                      Yearly at 5.0% of the car worth.
                    </span>
                  </div>

                  <div>
                    <span>
                      Suitable for car lovers seeking all rounded protection,
                      this plan covers:
                    </span>
                  </div>
                </div>

                <div className={"w-full h-0.5 bg-white bg-opacity-75"} />

                <div className={"grid grid-cols-12 gap-3"}>
                  <div
                    className={
                      "col-span-6 lg:col-span-4 flex items-center gap-2"
                    }
                  >
                    <TruckIcon className={"w-5 h-5"} />
                    <span className={"text-sm text-white opacity-75 truncate"}>
                      Accident
                    </span>
                  </div>

                  <div
                    className={
                      "col-span-6 lg:col-span-4 flex items-center gap-2"
                    }
                  >
                    <TruckIcon className={"w-5 h-5"} />
                    <span className={"text-sm text-white opacity-75 truncate"}>
                      Third Party Liability
                    </span>
                  </div>

                  <div
                    className={
                      "col-span-6 lg:col-span-4 flex items-center gap-2"
                    }
                  >
                    <TruckIcon className={"w-5 h-5"} />
                    <span className={"text-sm text-white opacity-75 truncate"}>
                      Personal Cover
                    </span>
                  </div>

                  <div
                    className={
                      "col-span-6 lg:col-span-4 flex items-center gap-2"
                    }
                  >
                    <TruckIcon className={"w-5 h-5"} />
                    <span className={"text-sm text-white opacity-75 truncate"}>
                      Theft
                    </span>
                  </div>

                  <div
                    className={
                      "col-span-6 lg:col-span-4 flex items-center gap-2"
                    }
                  >
                    <TruckIcon className={"w-5 h-5"} />
                    <span className={"text-sm text-white opacity-75 truncate"}>
                      Natural Calamities
                    </span>
                  </div>

                  <div
                    className={
                      "col-span-6 lg:col-span-4 flex items-center gap-2"
                    }
                  >
                    <TruckIcon className={"w-5 h-5"} />
                    <span className={"text-sm text-white opacity-75 truncate"}>
                      Add-on Choice
                    </span>
                  </div>
                </div>

                <div
                  className={
                    "absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-32 h-48 rounded-full bg-white opacity-25 blur-2xl"
                  }
                />
              </div>

              <div
                className={
                  "col-span-12 xl:col-span-6 p-6 space-y-6 border border-gray-main rounded-md"
                }
              >
                <span className={"text-2xl font-grotesk font-bold"}>
                  Single Year Comprehensive Insurance Summary:
                </span>

                <div className={"space-y-3"}>
                  <div className={"grid grid-cols-12 items-center gap-2"}>
                    <span className={"col-span-9 text-sm text-gray-dark"}>
                      Damage due to natural calamities - Fire, Earthquake,
                      Cyclone, Flood, etc...
                    </span>

                    <span
                      className={"col-span-3 text-sm font-medium text-right"}
                    >
                      ₦1,200,000
                    </span>
                  </div>

                  <div className={"grid grid-cols-12 items-center gap-2"}>
                    <span className={"col-span-9 text-sm text-gray-dark"}>
                      Damage due to events
                    </span>

                    <span
                      className={"col-span-3 text-sm font-medium text-right"}
                    >
                      ₦1,200,000
                    </span>
                  </div>

                  <div className={"grid grid-cols-12 items-center gap-2"}>
                    <span className={"col-span-9 text-sm text-gray-dark"}>
                      Damage to third party vehicle
                    </span>

                    <span
                      className={"col-span-3 text-sm font-medium text-right"}
                    >
                      ₦1,200,000
                    </span>
                  </div>

                  <div className={"w-full h-0.5 bg-gray-main"} />

                  <div className={"grid grid-cols-12 gap-2"}>
                    <span className={"col-span-9 text-gray-dark"}>Total</span>

                    <span className={"col-span-3 font-medium text-right"}>
                      ₦1,200,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      },
    [],
  );

  const StepSwitch = useMemo(
    () =>
      function StepSwitch() {
        switch (stepIndex) {
          case 3:
            return <PersonalDetailsComponent />;
          case 4:
            return <VehicleDetailsComponent />;
          case 5:
            return <PaymentDetailsComponent />;
        }
      },
    [
      stepIndex,
      PersonalDetailsComponent,
      VehicleDetailsComponent,
      PaymentDetailsComponent,
    ],
  );

  useEffect(() => {
    setSteps([
      {
        stepIndex: 1,
        stepLabel: "Basic Information",
        stepStatus: "completed",
      },
      {
        stepIndex: 2,
        stepLabel: "Choose Plan",
        stepStatus: "completed",
      },
      {
        stepIndex: 3,
        stepLabel: "Personal Details",
        stepStatus: "in-progress",
      },
      {
        stepIndex: 4,
        stepLabel: "Car Details",
        stepStatus: "pending",
      },
      {
        stepIndex: 5,
        stepLabel: "Payment",
        stepStatus: "pending",
      },
    ]);
    setStepIndex(3);
  }, []);

  return (
    <SubscriberLayout
      title={"Complete KYC Information"}
      caption={"Provide your personal details and make payment to proceed."}
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

export default SubscriberKycStepsComponent;
