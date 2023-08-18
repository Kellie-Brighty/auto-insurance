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
import { useContext, useEffect, useState } from "react";
import api from "../../../../../services/Api";
import subscriberService from "../../../../../services/subscriber.service";
import AgentPremiumCalculatorComponent from "@/common/app/kyc-steps/get-estimate";
import authService from "../../../../../services/auth.service";
import { GlobalContext } from "../../../../../services/context";
import { toast } from "react-toastify";

const SubscriberCreateVehicleComponent = () => {
  const { userBasicInfo } = useUserBasicInfo();
  const { GetVehichleEstimate } = authService;

  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { setSavedSubscriberInfo, savedSubscriberInfo } =
    useContext(GlobalContext);

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

        if (vehicle.status === 200 || vehicle.status === 201) {
          toast.success(vehicle.data.message);
          const res = await GetVehichleEstimate(vehicleDetails.carWorth);
          console.log("Vehcle created:::", vehicle.data);
          setVehicleID(res.data.data.id);

          if (res.status === 200 || res.status === 201) {
            const estimatedData = res.data.data;
            toast.success(res.data.message);

            localStorage.setItem(
              "SubscriberVehicleEstimateData",
              JSON.stringify(estimatedData)
            );
          }
        }

        setVehicleID(vehicle.data.data.id);
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong: ", error);
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }
    } else if (stepIndex === 2) {
      setLoading(true);
      const data = {
        user_id: userBasicInfo?.basic_info.vehicle.user_id,
        vehicle_id: vehicleID,
        policy_amount: savedSubscriberInfo.amount,
        hasExcessBuyBack: savedSubscriberInfo.hasExcessBuyBack,
        plan: savedSubscriberInfo.plan,
      };
      try {
        const res = await api.post(`/policy`, {
          user_id: data.user_id,
          vehcle_id: vehicleID,
          item_value: vehicleDetails.carWorth,
          policy_amount: savedSubscriberInfo.amount,
          hasExcessBuyBack: savedSubscriberInfo.hasExcessBuyBack,
          plan: savedSubscriberInfo.plan,
        });

        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          localStorage.setItem("New Policy ID", res.data.data.id);
        }
        setLoading(false);
      } catch (err: any) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
        setLoading(false);
        return;
      }
    } else if (stepIndex === 4) {
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
              savedSubscriberInfo.amount
            );
            console.log(res.data);
            if (res.status === 200 || res.status === 201) {
              toast.warn("Please wait while we redirect you for payment...");
              const payment_url =
                res.data.paystack_response.data.authorization_url;

              if (payment_url) window.location.href = payment_url;
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong: ", error);
        toast.error("Something went wrong");
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
        stepLabel: "Choose Plan",
        stepStatus: "pending",
      },
      {
        stepIndex: 3,
        stepLabel: "Upload Vehicle Images",
        stepStatus: "pending",
      },
      {
        stepIndex: 4,
        stepLabel: "Upload Vehicle Videos",
        stepStatus: "pending",
      },
      {
        stepIndex: 5,
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
          <AgentPremiumCalculatorComponent />
        ) : stepIndex == 3 ? (
          <UploadVehicleImagesComponent
            vehicleImagesDetails={vehicleImagesDetails}
            setVehicleImagesDetails={setVehicleImagesDetails}
            vehicleDetails={vehicleDetails}
          />
        ) : stepIndex == 4 ? (
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
            loading={loading}
          >
            {stepIndex === 4 ? "Proceed to pay" : "Next Step"}
          </ButtonComponent>
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default SubscriberCreateVehicleComponent;
