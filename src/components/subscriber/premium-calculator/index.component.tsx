import ButtonComponent from "@/common/button/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import { useContext, useEffect, useState } from "react";
import authService from "../../../../services/auth.service";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "../../../../services/context";

type MyObjectType = {
  excessBuyBack: {
    yearlyexcess: number;
    monthlyexcess: number;
    weeklyexcess: number;
  };
  monthly: number;
  quarterly: number;
  weekly: number;
  yearly: number;
};

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

const SubscriberPremiumCalculatorComponent = () => {
  const [states, setStates] = useState({
    yearly: 0,
    quarterly: 0,
    monthly: 0,
    weekly: 0,
    excessBuyBack: false,
    plan: "",
    loading: false,
    error: "",
    amount: "",
  });
  const [apiState, setApiState] = useState({
    email: "",
    phoneNumber: "",
    vehicleName: "",
    vehicleWorth: "",
    vehicleYear: "",
    amount: "",
    plan: "",
    hasExcessBuyBack: false,
    policyName: "",
  });
  const { RegisterSubscriber } = authService;
  const router = useRouter();
  const { estimateModal } = useContext(GlobalContext);

  useEffect(() => {
    const retreivedEstimateData = localStorage.getItem(
      "SubscriberVehicleEstimateData"
    );
    let parsedData: MyObjectType | null = null;
    if (retreivedEstimateData) {
      parsedData = JSON.parse(retreivedEstimateData) as MyObjectType;
      setStates({
        ...states,
        yearly: parsedData.yearly,
        quarterly: parsedData.quarterly,
        monthly: parsedData.monthly,
        weekly: parsedData.weekly,
      });
    }
  }, [estimateModal]);

  const registerSubscriberAction = async () => {
    setStates({ ...states, loading: true });
    const retrievedRgData = localStorage.getItem("SubscriberRegData");
    let parsedData: SavedObjectType | null = null;
    if (retrievedRgData) {
      parsedData = JSON.parse(retrievedRgData) as SavedObjectType;
      parsedData = {
        ...parsedData,
        amount: states.amount,
        plan: states.plan,
        hasExcessBuyBack: states.excessBuyBack,
      };
      console.log("Updated api state:::", parsedData);
      if (states.plan === "") {
        setStates({ ...states, loading: false, error: "Please choose a plan" });
        toast.error("Please choose a plan");
        return;
      } else {
        const {
          email,
          phoneNumber,
          vehicleName,
          vehicleWorth,
          vehicleYear,
          plan,
          hasExcessBuyBack,
          amount,
        } = parsedData;
        try {
          const res = await RegisterSubscriber(
            vehicleName,
            vehicleYear,
            vehicleWorth,
            phoneNumber,
            email,
            amount,
            plan,
            hasExcessBuyBack
          );
          console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            router.push("/auth/validate-token");
            setStates({ ...states, loading: false });
          }
        } catch (err: any) {
          console.log(err.response.data.message);
          setStates({
            ...states,
            loading: false,
            error: err.response.data.message,
          });
          toast.error(err.response.data.message);
        }
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={"p-8 border-b border-gray-main"}>
        <h1 className={"text-2xl font-grotesk font-bold"}>
          Premium Calculator
        </h1>
      </div>

      <div className={"p-8 grid grid-cols-12 gap-8"}>
        <div
          className={
            "col-span-12 lg:col-span-6 p-8 flex items-center justify-between gap-3 bg-plans-yearly rounded-md"
          }
        >
          <div>
            <h3 className={"text-lg font-bold"}>₦{states.yearly.toFixed(2)}</h3>
            <p className={"text-gray-dark"}>Yearly</p>
          </div>

          <input
            type={"radio"}
            name={"planType"}
            value={"yearly"}
            checked={states.plan === "yearly"}
            onChange={(e) =>
              setStates({
                ...states,
                plan: e.target.value,
                amount: states.yearly.toString(),
              })
            }
          />
        </div>

        <div
          className={
            "col-span-12 lg:col-span-6 p-8 flex items-center justify-between gap-3 bg-plans-quarterly rounded-md"
          }
        >
          <div>
            <h3 className={"text-lg font-bold"}>
              ₦{states.quarterly.toFixed(2)}
            </h3>
            <p className={"text-gray-dark"}>Quarterly</p>
          </div>

          <input
            type={"radio"}
            name={"planType"}
            value={"quarterly"}
            checked={states.plan === "quarterly"}
            onChange={(e) =>
              setStates({
                ...states,
                plan: e.target.value,
                amount: states.quarterly.toString(),
              })
            }
          />
        </div>

        <div
          className={
            "col-span-12 lg:col-span-6 p-8 flex items-center justify-between gap-3 bg-plans-monthly rounded-md"
          }
        >
          <div>
            <h3 className={"text-lg font-bold"}>
              ₦{states.monthly.toFixed(2)}
            </h3>
            <p className={"text-gray-dark"}>Monthly</p>
          </div>

          <input
            type={"radio"}
            name={"planType"}
            value={"monthly"}
            checked={states.plan === "monthly"}
            onChange={(e) =>
              setStates({
                ...states,
                plan: e.target.value,
                amount: states.monthly.toString(),
              })
            }
          />
        </div>

        <div
          className={
            "col-span-12 lg:col-span-6 p-8 flex items-center justify-between gap-3 bg-plans-weekly rounded-md"
          }
        >
          <div>
            <h3 className={"text-lg font-bold"}>₦{states.weekly.toFixed(2)}</h3>
            <p className={"text-gray-dark"}>Weekly</p>
          </div>

          <input
            type={"radio"}
            name={"planType"}
            value={"weekly"}
            checked={states.plan === "weekly"}
            onChange={(e) =>
              setStates({
                ...states,
                plan: e.target.value,
                amount: states.weekly.toString(),
              })
            }
          />
        </div>

        <div className={"col-span-12"}>
          <FormCheckboxComponent
            label={"Add excess buy back."}
            checked={states.excessBuyBack}
            onChange={() =>
              setStates({
                ...states,
                excessBuyBack: states.excessBuyBack === true ? false : true,
              })
            }
          />
        </div>

        <div className={"col-span-12"}>
          <ButtonComponent
            size={"base"}
            onClick={registerSubscriberAction}
            variant={"filled"}
            loading={states.loading}
          >
            Continue
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default SubscriberPremiumCalculatorComponent;
