import UploadVehicleImagesComponent, {
  VehicleImagesDetails,
} from "@/common/app/vehicle/upload-vehicle-images";
import UploadVehicleVideoComponent, {
  VehicleVideoDetails,
} from "@/common/app/vehicle/upload-vehicle-video";
import VehicleDetailsComponent, {
  VehicleDetails,
} from "@/common/app/vehicle/vehicle-details";
import ButtonComponent from "@/common/button/index.component";
import StepsComponent, { Step } from "@/common/steps/index.component";
import useUserBasicInfo from "@/hooks/useUserBasicInfo";
import AgentLayout from "@/layouts/agent/index.layout";
import { useEffect, useRef, useState } from "react";
import api from "../../../../../services/Api";
import Image from "next/image";
import agentService from "../../../../../services/agent.service";
import DialogComponent from "@/common/dialog/index.component";

const SubscriberCreateVehicleComponent = () => {
  const { userBasicInfo } = useUserBasicInfo();
  const [copyState, setCopyState] = useState(false);
  const [linkToCpy, setLinkToCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToCpy).then(() => {
      setIsCopied(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { GeneratePaymentLink } = agentService;

  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    carName: "",
    carWorth: 0,
    year: "",
    carType: "",
    carColor: "",
    plateNumber: "",
    engineNumber: "",
    chassisNumber: "",
  });

  const [vehicleID, setVehicleID] = useState<string | null>(null);

  const [vehicleImagesDetails, setVehicleImagesDetails] =
    useState<VehicleImagesDetails>({
      dashboard: "",
      frontSide: "",
      leftSide: "",
      backSide: "",
      rightSide: "",
    });
  const [vehicleVideoDetails, setVehicleVideoDetails] =
    useState<VehicleVideoDetails>({ video: "" });

  const handlePrevStep = async () => {
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

  // const handleNextStep = async () => {
  //   const autoFlexUserDataString = localStorage.getItem("AutoFlexUserData");

  //   if (autoFlexUserDataString) {
  //     const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
  //     if (stepIndex) {
  //       switch (stepIndex) {
  //         case 3:
  //           console.log(personalDetails);
  //           setLoading(true);

  //           try {
  //             const idCardFrontURL = await uploadBase64ImageToFirebaseStorage(
  //               personalDetails.idCardFront,
  //               `${uuidv4()}.png`
  //             );

  //             const idCardBackURL = await uploadBase64ImageToFirebaseStorage(
  //               personalDetails.idCardBack,
  //               `${uuidv4()}.png`
  //             );

  //             const res = await api.post(`/agent/register-subscriber`, {
  //               firstname: personalDetails.firstName,
  //               lastname: personalDetails.lastName,
  //               middlename: personalDetails.middleName,
  //               homeAddress: personalDetails.homeAddress,
  //               agent_id: autoFlexUserData.id,
  //               email: personalDetails.email,
  //               phoneNumber: personalDetails.phoneNumber,
  //             });

  //             if (res.status === 200 || res.status === 201) {
  //               localStorage.setItem(
  //                 "SubscriberDataOnAgent",
  //                 JSON.stringify(res.data.subscriber)
  //               );
  //               console.log(res.data);
  //               await api.post(`/subscriber/id-card`, {
  //                 id_front: idCardFrontURL,
  //                 id_back: idCardBackURL,
  //                 user_id: res.data.subscriber.id,
  //               });
  //             }

  //             // TODO: add subscriber ID card upload

  //             setLoading(false);
  //           } catch (error) {
  //             console.log("Something went wrong: ", error);
  //             setLoading(false);
  //             return;
  //           }
  //           break;
  //         case 4:
  //           console.log(vehicleDetails);

  //           setLoading(true);

  //           try {
  //             await api.put(
  //               `/vehicle/${userBasicInfo?.basic_info.vehicle.id}`,
  //               {
  //                 ...vehicleDetails,
  //                 chasisNumber: vehicleDetails.chassisNumber,
  //                 vehicleMedia: {},
  //                 vehicleMediaURLs: {},
  //               }
  //             );

  //             const vehicleDashboardURL = await uploadFileToFirebaseStorage(
  //               vehicleDetails.vehicleMedia.dashboard,
  //               `${uuidv4()}.${vehicleDetails.vehicleMedia.dashboard?.name.split(
  //                 "."
  //               )[1]}`
  //             );
  //             const vehicleFrontSideURL = await uploadFileToFirebaseStorage(
  //               vehicleDetails.vehicleMedia.frontSide,
  //               `${uuidv4()}.${vehicleDetails.vehicleMedia.frontSide?.name.split(
  //                 "."
  //               )[1]}`
  //             );
  //             const vehicleLeftSideURL = await uploadFileToFirebaseStorage(
  //               vehicleDetails.vehicleMedia.leftSide,
  //               `${uuidv4()}.${vehicleDetails.vehicleMedia.leftSide?.name.split(
  //                 "."
  //               )[1]}`
  //             );
  //             const vehicleBackSideURL = await uploadFileToFirebaseStorage(
  //               vehicleDetails.vehicleMedia.backSide,
  //               `${uuidv4()}.${vehicleDetails.vehicleMedia.backSide?.name.split(
  //                 "."
  //               )[1]}`
  //             );
  //             const vehicleRightSideURL = await uploadFileToFirebaseStorage(
  //               vehicleDetails.vehicleMedia.rightSide,
  //               `${uuidv4()}.${vehicleDetails.vehicleMedia.rightSide?.name.split(
  //                 "."
  //               )[1]}`
  //             );
  //             const vehicleVideoURL = await uploadFileToFirebaseStorage(
  //               vehicleDetails.vehicleMedia.video,
  //               `${uuidv4()}.${vehicleDetails.vehicleMedia.video?.name.split(
  //                 "."
  //               )[1]}`
  //             );

  //             // TODO: add vehicle media upload
  //             await api.post(`/vehicle/media`, {
  //               vehicle_dashboard: vehicleDashboardURL,
  //               vehicle_front: vehicleFrontSideURL,
  //               vehicle_left_side: vehicleLeftSideURL,
  //               vehicle_back: vehicleBackSideURL,
  //               vehicle_right_side: vehicleRightSideURL,
  //               vehicle_video: vehicleVideoURL,
  //               vehicle_id: userBasicInfo?.basic_info.vehicle.id,
  //             });

  //             setLoading(false);
  //           } catch (error) {
  //             console.log("Something went wrong: ", error);
  //             setLoading(false);
  //             return;
  //           }
  //           break;
  //         case 5:
  //           try {
  //             setLoading(true);

  //             const res = await GeneratePaymentLink(
  //               personalDetails.email,
  //               userBasicInfo?.basic_info.policy.policy_amount
  //             );
  //             console.log(res.data);
  //             if (res.status === 200 || res.status === 201) {
  //               const payment_url =
  //                 res.data.paystack_response.data.authorization_url;

  //               if (payment_url) {
  //                 setCopyState(true);
  //                 setLinkToCopy(payment_url);
  //               }
  //             }

  //             setLoading(false);
  //           } catch (error) {
  //             console.log("Something went wrong: ", error);
  //             setLoading(false);
  //             return;
  //           }
  //       }

  //       setSteps((prev) =>
  //         prev.map((step) =>
  //           step.stepIndex === stepIndex + 1
  //             ? { ...step, stepStatus: "in-progress" }
  //             : step.stepIndex === stepIndex
  //             ? { ...step, stepStatus: "completed" }
  //             : step
  //         )
  //       );

  //       if (stepIndex === 5) {
  //         return;
  //       } else {
  //         setStepIndex(stepIndex + 1);
  //       }
  //     }
  //   }
  // };

  const handleNextStep = async () => {
    if (stepIndex === 1) {
      setLoading(true);
      try {
        const subscriberData = localStorage.getItem("SubscriberDataOnAgent");

        if (subscriberData) {
          const subscriberDataParsed = JSON.parse(subscriberData) as any;
          if (subscriberDataParsed) {
            const vehicle = await api.post(`/vehicle`, {
              user_id: subscriberDataParsed.id,
              vehicleName: vehicleDetails.carName,
              vehicleWorth: vehicleDetails.carWorth,
              vehicleYear: vehicleDetails.year,
              vehicleType: vehicleDetails.carType,
              vehicleColor: vehicleDetails.carColor,
              plateNumber: vehicleDetails.plateNumber,
              chasisNumber: vehicleDetails.chassisNumber,
              engineNumber: vehicleDetails.engineNumber,
              agent_id: userBasicInfo?.basic_info.policy.user_id,
            });

            setVehicleID(vehicle.data.data.id);
            setLoading(false);
          }
        } else {
          setLoading(false);
          alert("No User data");
          return;
        }
      } catch (error) {
        console.log("Something went wrong: ", error);
        setLoading(false);
        return;
      }
    } else if (stepIndex === 3) {
      setLoading(true);
      try {
        const res = await api.post(`/vehicle/media`, {
          vehicle_dashboard: vehicleImagesDetails.dashboard,
          vehicle_front: vehicleImagesDetails.frontSide,
          vehicle_left_side: vehicleImagesDetails.leftSide,
          vehicle_back: vehicleImagesDetails.backSide,
          vehicle_right_side: vehicleImagesDetails.rightSide,
          vehicle_video: vehicleVideoDetails.video,
          vehicle_id: vehicleID,
        });

        if (res.status === 200 || res.status === 201) {
          const subscriberData = localStorage.getItem("SubscriberDataOnAgent");

          if (subscriberData) {
            const subscriberDataParsed = JSON.parse(subscriberData) as any;
            if (subscriberDataParsed) {
              const res = await GeneratePaymentLink(
                subscriberDataParsed.email,
                userBasicInfo?.basic_info.policy.policy_amount
              );
              console.log(res.data);
              if (res.status === 200 || res.status === 201) {
                const payment_url =
                  res.data.paystack_response.data.authorization_url;

                if (payment_url) {
                  setCopyState(true);
                  setLinkToCopy(payment_url);
                }
              }
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong: ", error);
        setLoading(false);
        return;
      }
    }

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

      if (stepIndex === 3) {
        return;
      } else {
        setStepIndex(stepIndex + 1);
      }
    }
  };

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
    <AgentLayout
      title={"New Vehicle Insurance"}
      caption={"Provide your vehicle details and make payment to proceed."}
    >
      <div className={"space-y-8"}>
        <StepsComponent steps={steps} />

        {stepIndex === 1 ? (
          <VehicleDetailsComponent
            vehicleDetails={vehicleDetails}
            setVehicleDetails={setVehicleDetails}
          />
        ) : stepIndex === 2 ? (
          <UploadVehicleImagesComponent
            vehicleImagesDetails={vehicleImagesDetails}
            setVehicleImagesDetails={setVehicleImagesDetails}
            vehicleDetails={vehicleDetails}
          />
        ) : stepIndex == 3 ? (
          <UploadVehicleVideoComponent
            vehicleVideoDetails={vehicleVideoDetails}
            setVehicleVideoDetails={setVehicleVideoDetails}
            vehicleDetails={vehicleDetails}
          />
        ) : (
          <></>
        )}

        <DialogComponent show={copyState} onClose={() => setCopyState(false)}>
          <div className={`p-[24px]`}>
            <p className={`text-[24px] font-bold font-grotesk`}>
              Send the referral link{" "}
            </p>
            <p className={`mt-[8px] text-[#64748B] text-[15px]`}>
              Send referral link to subscriber to make for the policy{" "}
            </p>

            <div
              className={`mt-[24px] border-[#DCE5F0] border-[1px] 
              rounded-full flex items-center p-[16px] justify-between`}
            >
              <p
                className={`font-inter font-semibold text-[#64748B] text-[16px]`}
              >
                {linkToCpy ? linkToCpy : null}
              </p>
              <div
                className={`flex items-center space-x-5 cursor-pointer`}
                onClick={handleCopy}
              >
                <Image
                  src={"/assets/agent/copy-gray.svg"}
                  alt="copy"
                  width={22}
                  height={22}
                />
                <p
                  className={`font-inter font-semibold text-[#64748B] text-[16px]`}
                >
                  {isCopied ? "Copied to clipboard" : "Copy link"}
                </p>
              </div>
            </div>
          </div>
        </DialogComponent>

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
            {loading ? (
              "Wait..."
            ) : stepIndex === 3 ? (
              <p className={`flex items-center space-x-3`}>
                Send the referral link{" "}
                <Image
                  src={"/assets/agent/copy.svg"}
                  alt="copy"
                  width={22}
                  height={22}
                />
              </p>
            ) : (
              "Next Step"
            )}
          </ButtonComponent>
        </div>
      </div>
    </AgentLayout>
  );
};

export default SubscriberCreateVehicleComponent;
