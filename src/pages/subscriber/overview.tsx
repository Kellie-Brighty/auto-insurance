import SubscriberKycStepsComponent from "@/components/subscriber/kyc-steps/index.component";
import { useContext, useEffect, useState } from "react";
import SubscriberDashboardComponent from "@/components/subscriber/dashboard";
import subscriberService from "../../../services/subscriber.service";
import { GlobalContext } from "../../../services/context";

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
  const [kycCompleted, setKycCompleted] = useState(false);

  useEffect(() => {
    setKycCompleted(false);
  }, []);

  return kycCompleted ? (
    <SubscriberDashboardComponent />
  ) : (
    <SubscriberKycStepsComponent />
  );
}
