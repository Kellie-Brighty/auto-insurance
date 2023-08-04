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
import uploadBase64ImageToFirebaseStorage from "@/utils/firebase/uploadBase64ImageToFBStorage";
import uploadFileToFirebaseStorage from "@/utils/firebase/uploadFileToFirebaseStorage";
import { uuidv4 } from "@firebase/util";
import React, { useContext, useEffect, useState } from "react";
import api from "../../../../services/Api";
import subscriberService from "../../../../services/subscriber.service";
import { useRouter } from "next/router";
import { GlobalContext } from "../../../../services/context";

interface KYCstatus {
  createdAt: string;
  deletedAt: null;
  id: number;
  kyc_complete: boolean;
  personal_info_complete: boolean;
  updatedAt: string;
  user_id: number;
  vehicle_info_complete: boolean;
}

const SubscriberKycStepsComponent = () => {
  const { userBasicInfo, getAndSetUserBasicInfo } = useUserBasicInfo();

  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstname: "",
    middlename: "",
    lastname: "",
    homeAddress: "",
    id_type: "",
    idCardFront: "",
    idCardBack: "",
  });
  const { MakePayment, VerifyPayment } = subscriberService;
  const router = useRouter();
  const { reference } = router.query;
  const { setKycCompleted } = useContext(GlobalContext);
  const [kycStatus, setKycStatus] = useState<KYCstatus | null>(null);

  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    vehicleName: userBasicInfo?.basic_info.vehicle.vehicleName || "",
    vehicleYear: userBasicInfo?.basic_info.vehicle.vehicleYear || "",
    vehicleType: userBasicInfo?.basic_info.vehicle.vehicleType || "",
    vehicleColor: userBasicInfo?.basic_info.vehicle.vehicleColor || "",
    plateNumber: userBasicInfo?.basic_info.vehicle.plateNumber || "",
    engineNumber: userBasicInfo?.basic_info.vehicle.engineNumber || "",
    chassisNumber: userBasicInfo?.basic_info.vehicle.chasisNumber || "",
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

  const fetchKycStatus = async () => {
    const autoFlexUserDataString = localStorage.getItem("AutoFlexUserData");

    if (autoFlexUserDataString) {
      const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
      const kycStatusData = await api.get(
        `/subscriber/kyc-status?user_id=${autoFlexUserData.id}`
      );

      console.log("kycStata-==", kycStatusData);
      setKycStatus(kycStatusData.data.data);
    }

    // console.log("user basic info:::", userBasicInfo && userBasicInfo);
    // TODO: set kyc status to a state
  };

  const handlePrevStep = () => {
    if (stepIndex) {
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
    if (stepIndex) {
      switch (stepIndex) {
        case 3:
          console.log(personalDetails);
          setLoading(true);

          try {
            await api.put(
              `/subscriber/${userBasicInfo?.basic_info.vehicle.user_id}`,
              { ...personalDetails, idCardFront: "", idCardBack: "" }
            );

            const idCardFrontURL = await uploadBase64ImageToFirebaseStorage(
              personalDetails.idCardFront,
              `${uuidv4()}.png`
            );

            const idCardBackURL = await uploadBase64ImageToFirebaseStorage(
              personalDetails.idCardBack,
              `${uuidv4()}.png`
            );

            // TODO: add subscriber ID card upload
            await api.post(`/subscriber/id-card`, {
              id_front: idCardFrontURL,
              id_back: idCardBackURL,
              user_id: userBasicInfo?.basic_info.vehicle.user_id,
            });

            // TODO: update user data in local storage
            const autoFlexUserData = await api.get(
              `/subscriber/${userBasicInfo?.basic_info.vehicle.user_id}`
            );

            if (autoFlexUserData.data.data) {
              localStorage.setItem(
                "AutoFlexUserData",
                JSON.stringify(autoFlexUserData.data.data.subscriber)
              );
            }

            // TODO: update the kyc status
            await api.put(
              `/subscriber/kyc-status?user_id=${userBasicInfo?.basic_info.vehicle.user_id}`,
              {
                personal_info_complete: true,
              }
            );

            await fetchKycStatus();
            setLoading(false);
          } catch (error) {
            console.log("Something went wrong: ", error);
            setLoading(false);
            return;
          }
          break;
        case 4:
          console.log(vehicleDetails);

          setLoading(true);

          try {
            await api.put(`/vehicle/${userBasicInfo?.basic_info.vehicle.id}`, {
              ...vehicleDetails,
              chasisNumber: vehicleDetails.chassisNumber,
              vehicleMedia: {},
              vehicleMediaURLs: {},
            });

            const vehicleDashboardURL = await uploadFileToFirebaseStorage(
              vehicleDetails.vehicleMedia.dashboard,
              `${uuidv4()}.${vehicleDetails.vehicleMedia.dashboard?.name.split(
                "."
              )[1]}`
            );
            const vehicleFrontSideURL = await uploadFileToFirebaseStorage(
              vehicleDetails.vehicleMedia.frontSide,
              `${uuidv4()}.${vehicleDetails.vehicleMedia.frontSide?.name.split(
                "."
              )[1]}`
            );
            const vehicleLeftSideURL = await uploadFileToFirebaseStorage(
              vehicleDetails.vehicleMedia.leftSide,
              `${uuidv4()}.${vehicleDetails.vehicleMedia.leftSide?.name.split(
                "."
              )[1]}`
            );
            const vehicleBackSideURL = await uploadFileToFirebaseStorage(
              vehicleDetails.vehicleMedia.backSide,
              `${uuidv4()}.${vehicleDetails.vehicleMedia.backSide?.name.split(
                "."
              )[1]}`
            );
            const vehicleRightSideURL = await uploadFileToFirebaseStorage(
              vehicleDetails.vehicleMedia.rightSide,
              `${uuidv4()}.${vehicleDetails.vehicleMedia.rightSide?.name.split(
                "."
              )[1]}`
            );
            const vehicleVideoURL = await uploadFileToFirebaseStorage(
              vehicleDetails.vehicleMedia.video,
              `${uuidv4()}.${vehicleDetails.vehicleMedia.video?.name.split(
                "."
              )[1]}`
            );

            // TODO: add vehicle media upload
            await api.post(`/vehicle/media`, {
              vehicle_dashboard: vehicleDashboardURL,
              vehicle_front: vehicleFrontSideURL,
              vehicle_left_side: vehicleLeftSideURL,
              vehicle_back: vehicleBackSideURL,
              vehicle_right_side: vehicleRightSideURL,
              vehicle_video: vehicleVideoURL,
              vehicle_id: userBasicInfo?.basic_info.vehicle.id,
            });

            // TODO: update vehicle in basic info
            getAndSetUserBasicInfo();

            // TODO: update the kyc status
            await api.put(
              `/subscriber/kyc-status?user_id=${userBasicInfo?.basic_info.vehicle.user_id}`,
              {
                vehicle_info_complete: true,
              }
            );
            setLoading(false);
            await fetchKycStatus();
          } catch (error) {
            console.log("Something went wrong: ", error);
            setLoading(false);
            return;
          }
          break;
        case 5:
          try {
            setLoading(true);
            const autoFlexUserDataString =
              localStorage.getItem("AutoFlexUserData");

            if (autoFlexUserDataString) {
              const autoFlexUserData = JSON.parse(
                autoFlexUserDataString
              ) as any;
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
            setLoading(false);
          } catch (error) {
            console.log("Something went wrong: ", error);
            setLoading(false);
            return;
          }
          break;
      }

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
    fetchKycStatus();
  }, []);

  const verifyPaymentAction = async () => {
    if (reference) {
      const res = await VerifyPayment(reference);
      if (res.data.status === "success") {
        await api.put(
          `/subscriber/kyc-status?user_id=${userBasicInfo?.basic_info.vehicle.user_id}`,
          {
            kyc_complete: true,
          }
        );
        await fetchKycStatus();
        setKycCompleted(true);
      }
    }
  };

  useEffect(() => {
    verifyPaymentAction();
  }, [reference]);

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

    if (kycStatus?.personal_info_complete) {
      setStepIndex(4);
    }
    if (kycStatus?.vehicle_info_complete) {
      setStepIndex(5);
    }
    if (!kycStatus?.personal_info_complete) {
      setStepIndex(3);
    }
  }, [kycStatus]); // TODO: add a kyc status dependency and update the steps based on the kyc status

  useEffect(() => {
    setVehicleDetails((prev) => ({
      ...prev,
      vehicleName: userBasicInfo?.basic_info.vehicle.vehicleName || "",
      vehicleYear: userBasicInfo?.basic_info.vehicle.vehicleYear || "",
      vehicleType: userBasicInfo?.basic_info.vehicle.vehicleType || "",
      vehicleColor: userBasicInfo?.basic_info.vehicle.vehicleColor || "",
      plateNumber: userBasicInfo?.basic_info.vehicle.plateNumber || "",
      engineNumber: userBasicInfo?.basic_info.vehicle.engineNumber || "",
      chassisNumber: userBasicInfo?.basic_info.vehicle.chasisNumber || "",
    }));
  }, [userBasicInfo]);

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
            totalAmount={userBasicInfo?.basic_info.policy.policy_amount || 0}
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
              : stepIndex === 5
              ? "Make payment"
              : "Next Step"}
          </ButtonComponent>
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default SubscriberKycStepsComponent;
