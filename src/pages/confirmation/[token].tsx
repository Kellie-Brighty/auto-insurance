import VerifySubscriberEmailComponent from "@/components/subscriber/verify-email/index.component";
import { useState } from "react";
import authService from "../../../services/auth.service";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type SavedObjectType = {
  email: string;
  phoneNumber: string;
  vehicleName: string;
  vehicleWorth: string;
  vehicleYear: string;
  amount: string;
  plan: string;
  hasExcessBuyBack: boolean;
  policyName: string;
};

const VerifyUser = () => {
  const { ResendEmailConfirmation, VerifyUser } = authService;
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const resendEmailAction = async () => {
    setResendLoading(true);
    const retrievedUserData = localStorage.getItem("SubscriberRegData");
    let parsedData: SavedObjectType | null = null;
    if (retrievedUserData) {
      parsedData = JSON.parse(retrievedUserData);
      console.log("parsed while resending:::", parsedData);
      const email = parsedData?.email;

      try {
        const res = await ResendEmailConfirmation(email);
        console.log(res.data);
        toast.success(res.data.message);
        setResendLoading(false);
      } catch (err: any) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
        setResendLoading(false);
      }
    }
  };

  const verifyEmailAction = async () => {
    setLoading(true);
    console.log("route token:::", router.query.token);

    try {
      const res = await VerifyUser(router.query.token);
      console.log(res.data);
      if (res.status === 200 || res.status === 201) {
        router.push("/auth/choose-user-type");
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <VerifySubscriberEmailComponent
      title="Verify Email"
      subTitle="Thank you, verify your email by clicking confirm below"
      buttonText="Confirm"
      resendText="Confimation token expired?"
      resendAction={resendEmailAction}
      loading={resendLoading}
      action={verifyEmailAction}
      actionLoading={loading}
    />
  );
};

export default VerifyUser;
