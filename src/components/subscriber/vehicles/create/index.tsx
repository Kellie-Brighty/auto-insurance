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
import SubscriberLayout from "@/layouts/subscriber/index.layout";
import { useEffect, useState } from "react";
import api from "../../../../../services/Api";
import subscriberService from "../../../../../services/subscriber.service";

const SubscriberCreateVehicleComponent = () => {
  const { userBasicInfo } = useUserBasicInfo();

  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

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
  const { MakePayment } = subscriberService;

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

  const handleNextStep = async () => {
    if (stepIndex === 1) {
      setLoading(true);
      try {
        const vehicle = await api.post(`/vehicle`, {
          user_id: userBasicInfo?.basic_info.vehicle.user_id,
          vehicleName: vehicleDetails.carName,
          vehicleWorth: vehicleDetails.carWorth,
          vehicleYear: vehicleDetails.year,
          vehicleType: vehicleDetails.carType,
          vehicleColor: vehicleDetails.carColor,
          plateNumber: vehicleDetails.plateNumber,
          chasisNumber: vehicleDetails.chassisNumber,
          engineNumber: vehicleDetails.engineNumber,
        });

        setVehicleID(vehicle.data.data.id);
        setLoading(false);
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
          const autoFlexUserDataString =
            localStorage.getItem("AutoFlexUserData");

          if (autoFlexUserDataString) {
            const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
            const res = await MakePayment(
              autoFlexUserData.email,
              userBasicInfo?.basic_info.policy.policy_amount
            );
            console.log(res.data);
            if (res.status === 200 || res.status === 201) {
              const payment_url =
                res.data.paystack_response.data.authorization_url;

              if (payment_url) window.location.href = payment_url;
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

      setStepIndex(stepIndex + 1);
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
    <SubscriberLayout
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
            {loading
              ? "Wait..."
              : stepIndex === 3
              ? "Proceed to pay"
              : "Next Step"}
          </ButtonComponent>
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default SubscriberCreateVehicleComponent;
