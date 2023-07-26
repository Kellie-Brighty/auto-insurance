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
  const { GetSubscriberBasicInfo } = subscriberService;
  const { setSubscriberBasicInfo } = useContext(GlobalContext);

  const getSubscriberBasicInfoAction = async () => {
    const userData = localStorage.getItem("AutoFlexUserData");
    let parsedData: UserDataType | null = null;
    if (userData) {
      parsedData = JSON.parse(userData) as UserDataType;
      const userId = parsedData.id;

      try {
        const res = await GetSubscriberBasicInfo(userId);
        if (res.status === 200 || res.status === 201) {
          // console.log(res.data.data.basic_info);
          setSubscriberBasicInfo(res.data.data.basic_info);
        }
      } catch (err: any) {
        console.log(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    setKycCompleted(false);
    getSubscriberBasicInfoAction();
  }, []);

  return kycCompleted ? (
    <SubscriberDashboardComponent />
  ) : (
    <SubscriberKycStepsComponent />
  );
}
