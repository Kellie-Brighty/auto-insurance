import AuthLayout from "@/layouts/auth/index.layout";
import FormInputComponent from "@/common/form-input/index.component";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ButtonComponent from "@/common/button/index.component";
import { useEffect, useState } from "react";
import authService from "../../../../services/auth.service";
import { useRouter } from "next/router";

type RetrievedData = {
  email: "ryfajuto@tutuapp.bid";
  phoneNumber: string;
  vehicleName: string;
  vehicleWorth: string;
  vehicleYear: string;
};

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { SignIn } = authService;
  const router = useRouter();

  const SignInAction = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      setErrors("No field should be empy");
      setLoading(false);
    } else {
      try {
        const res = await SignIn(email, password);
        console.log(res.data);
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("AutoFlexUserToken", res.data.accessToken);
          const userole = res.data.data.role;
          if (userole === "subscriber") {
            router.push("/subscriber/overview");
          }
          setLoading(false);
        }
      } catch (err: any) {
        console.log(err.response.data.message);
        setErrors(err.response.data.message);
        setLoading(false);
      }
    }
  };

  //Trying to set Email field automatically if the email exists in localStorage

  // useEffect(() => {
  //   const retrievedEmail = localStorage.getItem("SubscriberRegData");
  //   let parsedData: RetrievedData | null = null;

  //   if (retrievedEmail) {
  //     parsedData = JSON.parse(retrievedEmail);
  //     const email = parsedData?.email;
  //     setEmail(email);
  //   }
  // }, []);

  return (
    <AuthLayout title={"Sign In"}>
      {errors && <p className={`text-red-500 text-[14px] mb-5`}>{errors}</p>}
      <div className={"space-y-3"}>
        <FormInputComponent
          label={"Email or Phone Number"}
          Icon={<EnvelopeIcon className={"w-5 h-5 text-gray-dark"} />}
          value={email}
          onChange={(e) => {
            setErrors(null);
            setEmail(e.target.value);
          }}
        />

        <FormInputComponent
          type={"password"}
          label={"Password"}
          Icon={<LockClosedIcon className={"w-5 h-5 text-gray-dark"} />}
          helper={
            <Link href={"/auth/forgot-password"} className={"block text-right"}>
              Forgot your password?
            </Link>
          }
          value={password}
          onChange={(e) => {
            setErrors(null);
            setPassword(e.target.value);
          }}
        />

        <ButtonComponent
          fullWidth={true}
          variant={"filled"}
          onClick={SignInAction}
        >
          {loading ? "Signing in..." : "Sign In"}
        </ButtonComponent>

        <p>
          New to AutoFlex?{" "}
          <button className={"text-primary font-medium"}>Get Estimate</button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignInComponent;
