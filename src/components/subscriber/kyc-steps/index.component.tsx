import PaymentDetailsComponent from "@/common/app/kyc-steps/payment-details";
import PersonalDetailsComponent, {
  PersonalDetails,
} from "@/common/app/kyc-steps/personal-details";
import VehicleDetailsComponent, {
  VehicleDetails,
} from "@/common/app/kyc-steps/vehicle-details";
import ButtonComponent from "@/common/button/index.component";
import StepsComponent, { Step } from "@/common/steps/index.component";
import useUserBasicInfo from "@/hooks/useUserBasicInfo";
import SubscriberLayout from "@/layouts/subscriber/index.layout";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import api from "../../../../services/Api";

const SubscriberKycStepsComponent = () => {
  const basicUserInfo = useUserBasicInfo();

  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    middleName: "",
    lastName: "",
    homeAddress: "",
    modeOfIdentification: "",
    idCardFront: "",
    idCardBack: "",
  });

  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    carName: basicUserInfo?.basic_info.vehicle.vehicleName || "",
    year: basicUserInfo?.basic_info.vehicle.vehicleYear || "",
    carType: basicUserInfo?.basic_info.vehicle.vehicleType || "",
    carColor: basicUserInfo?.basic_info.vehicle.vehicleColor || "",
    plateNumber: basicUserInfo?.basic_info.vehicle.plateNumber || "",
    engineNumber: basicUserInfo?.basic_info.vehicle.engineNumber || "",
    chassisNumber: basicUserInfo?.basic_info.vehicle.chasisNumber || "",
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

  const handleNextStep = async () => {
    if (stepIndex) {
      switch (stepIndex) {
        case 3:
          console.log(personalDetails);

          try {
            await api.put(
              `/subscriber/${basicUserInfo?.basic_info.vehicle.user_id}`,
              {
                ...personalDetails,
              },
            );

            const formData = new FormData();

            formData.append("id_front", personalDetails.idCardFront);
            formData.append("id_back", personalDetails.idCardBack);
            formData.append(
              "user_id",
              basicUserInfo?.basic_info.vehicle.user_id,
            );

            await api.post(`/subscriber/id-card`, formData);
          } catch (error) {
            console.log("Something went wrong: ", error);
            // return;
          }
          break;
        case 4:
          console.log(vehicleDetails);

          try {
            await api.put(`/vehicle/${basicUserInfo?.basic_info.vehicle.id}`, {
              ...vehicleDetails,
              chasisNumber: vehicleDetails.chassisNumber,
            });

            const formData = new FormData();

            formData.append(
              "vehicle_dashboard",
              vehicleDetails.vehicleMedia.dashboard,
            );
            formData.append(
              "vehicle_front_side",
              vehicleDetails.vehicleMedia.frontSide,
            );
            formData.append(
              "vehicle_left_side",
              vehicleDetails.vehicleMedia.leftSide,
            );
            formData.append(
              "vehicle_back_side",
              vehicleDetails.vehicleMedia.backSide,
            );
            formData.append(
              "vehicle_right_side",
              vehicleDetails.vehicleMedia.rightSide,
            );
            formData.append("vehicle_video", vehicleDetails.vehicleMedia.video);
            formData.append(
              "user_id",
              basicUserInfo?.basic_info.vehicle.user_id,
            );

            await api.post(`/vehicle/media`, formData);
          } catch (error) {
            console.log("Something went wrong: ", error);
          }
          break;
      }

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

  useEffect(() => {
    setVehicleDetails((prev) => ({
      ...prev,
      carName: basicUserInfo?.basic_info.vehicle.vehicleName || "",
      year: basicUserInfo?.basic_info.vehicle.vehicleYear || "",
      carType: basicUserInfo?.basic_info.vehicle.vehicleType || "",
      carColor: basicUserInfo?.basic_info.vehicle.vehicleColor || "",
      plateNumber: basicUserInfo?.basic_info.vehicle.plateNumber || "",
      engineNumber: basicUserInfo?.basic_info.vehicle.engineNumber || "",
      chassisNumber: basicUserInfo?.basic_info.vehicle.chasisNumber || "",
    }));
  }, [basicUserInfo]);

  return (
    <SubscriberLayout
      title={"Complete KYC Information"}
      caption={"Provide your personal details and make payment to proceed."}
    >
      <div className={"space-y-8"}>
        <StepsComponent steps={steps} />

        {stepIndex === 3 ? (
          <PersonalDetailsComponent
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
          />
        ) : stepIndex === 4 ? (
          <VehicleDetailsComponent
            vehicleDetails={vehicleDetails}
            setVehicleDetails={setVehicleDetails}
          />
        ) : stepIndex === 5 ? (
          <PaymentDetailsComponent
            totalAmount={basicUserInfo?.basic_info.policy.policy_amount || 0}
          />
        ) : (
          <></>
        )}

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
