import IndexComponent from "@/components/auth/reset-password/index.component";
import { useRouter } from "next/router";
import { useState } from "react";
import authService from "../../../../services/auth.service";

type RetrievedData = {
  email: "ryfajuto@tutuapp.bid";
  phoneNumber: string;
  vehicleName: string;
  vehicleWorth: string;
  vehicleYear: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const routeParam = router.query.token;
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { VerifyToken, SetPassword, ResendSetPasswordEmail } = authService;
  const [resendLoading, setResendLoading] = useState(false);

  const resetPasswordAction = async () => {
    setLoading(true);
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setLoading(false);
      setErrors("No field should be empty");
      return;
    } else if (newPassword !== confirmPassword) {
      setLoading(false);
      setErrors("New password does not match confirm password.");
      return;
    } else {
      try {
        console.log(router.query.token);
        await VerifyToken(router.query.token).then(async (res) => {
          //   console.log("verify token response:::", res.data);
          if (res.status === 200 || res.status === 201) {
            const user_id = res.data.data.user_id;
            console.log("User id from token:::", user_id);
            const response = await SetPassword(newPassword, user_id);
            console.log(response.data);
            if (response.status === 200 || response.status === 201) {
              router.push("/auth/sign-in");
              setLoading(false);
            }
          }
        });
      } catch (err: any) {
        console.log(err.response.data.message);
        setErrors(err.response.data.message);
        setLoading(false);
      }
    }
  };

  const resendEmailAction = async () => {
    setResendLoading(true);
    const retrievedEmail = localStorage.getItem("SubscriberRegData");
    let parsedData: RetrievedData | null = null;
    if (retrievedEmail) {
      parsedData = JSON.parse(retrievedEmail);

      try {
        const res = await ResendSetPasswordEmail(parsedData?.email);
        console.log(res.data);
        if (res.status === 200 || res.status === 201) {
          setResendLoading(false);
        }
      } catch (err: any) {
        setResendLoading(false);
        console.log(err.response.data.message);
        setErrors(err.response.data.message);
      }
    }
  };

  return (
    <IndexComponent
      routeParam={routeParam}
      action={resetPasswordAction}
      loading={loading}
      oldPassword={oldPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      setNewPassword={setNewPassword}
      setOldPassword={setOldPassword}
      error={errors}
      setError={setErrors}
      resendEmail={resendEmailAction}
      resendLoading={resendLoading}
    />
  );
}
