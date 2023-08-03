import SubscriberKycStepsComponent from "@/components/subscriber/kyc-steps/index.component";
import { useContext, useEffect, useState } from "react";
import SubscriberDashboardComponent from "@/components/subscriber/dashboard";
import { GlobalContext } from "../../../services/context";
import subscriberService from "../../../services/subscriber.service";

type UserDataType = {
  createdAt: string;
  deletedAt: null;
  email: string;
  emailVerified: true;
  firstname: null;
  homeAddress: null;
  id: number;
  id_type: null;
  lastname: null;
  middlename: null;
  phoneNumber: string;
  role: string;
  status: string;
  updatedAt: string;
};

export default function SubscriberOverview() {
  const { setKycCompleted, kycCompleted } = useContext(GlobalContext);
  const { FetchKYCStatus } = subscriberService;

  const checkKYCStatus = async () => {
    const autoFlexUserDataString = localStorage.getItem("AutoFlexUserData");

    if (autoFlexUserDataString) {
      const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
      const kycStatusData = await FetchKYCStatus(autoFlexUserData.id);
      console.log("kyc data in overview:::", kycStatusData.data.data);
      if (kycStatusData.data.data.kyc_complete === true) {
        setKycCompleted(true);
      }
    }
  };

  useEffect(() => {
    checkKYCStatus();
  }, []);

  return kycCompleted ? (
    <SubscriberDashboardComponent />
  ) : (
    <SubscriberKycStepsComponent />
  );
}
