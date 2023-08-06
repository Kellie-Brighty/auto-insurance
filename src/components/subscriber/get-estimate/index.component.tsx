import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import ButtonComponent from "@/common/button/index.component";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../../../../services/context";
import authService from "../../../../services/auth.service";
import VehicleJson from "./carmodelb.json";
import YearJson from "./year.json";

const GetEstimateForSubscriberComponent = () => {
  const router = useRouter();
  const [states, setStates] = useState({
    vehicleName: "",
    vehicleYear: "",
    vehicleWorth: "",
    email: "",
    phoneNumber: "",
  });
  const [uiStates, setUiStates] = useState({
    loading: false,
    error: "",
  });
  const { setEstimateModal } = useContext(GlobalContext);
  const { GetVehichleEstimate } = authService;

  const getEstimateAction = async () => {
    setUiStates({ ...uiStates, loading: true });
    if (
      states.email === "" ||
      states.phoneNumber === "" ||
      states.vehicleName === "" ||
      states.vehicleWorth === "" ||
      states.vehicleYear === ""
    ) {
      setUiStates({
        ...uiStates,
        loading: false,
        error: "No field should be left empty",
      });
      return;
    } else {
      try {
        const res = await GetVehichleEstimate(parseFloat(states.vehicleWorth));
        console.log(res.data);
        const estimatedData = res.data.data;

        localStorage.setItem(
          "SubscriberVehicleEstimateData",
          JSON.stringify(estimatedData)
        );
        setUiStates({ ...uiStates, loading: false });
        localStorage.setItem("SubscriberRegData", JSON.stringify(states));
        setEstimateModal(true);
      } catch (err: any) {
        console.log(err.response.data.message);
        setUiStates({
          ...uiStates,
          loading: false,
          error: err.response.data.message,
        });
      }
    }
  };

  return (
    <div>
      <div className={"p-8 border-b border-gray-main"}>
        <h1 className={"text-2xl font-grotesk font-bold"}>Get Estimate</h1>
      </div>

      <div className={"p-8 grid grid-cols-12 gap-3"}>
        <div className={"col-span-12 lg:col-span-12"}>
          <FormSelectComponent
            name={"carType"}
            required={true}
            label={"Which car do you own?"}
            value={states.vehicleName}
            onChange={(e) =>
              setStates({ ...states, vehicleName: e.target.value })
            }
            style={{ maxHeight: 200, overflowY: "auto" }}
          >
            <option value="">Select a vehicle</option>
            {VehicleJson.map((vehicle) => (
              <option value={vehicle.Abadal}>{vehicle.Abadal}</option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormSelectComponent
            name={"year"}
            required={true}
            label={"Year"}
            value={states.vehicleYear}
            onChange={(e) => {
              setStates({ ...states, vehicleYear: e.target.value });
            }}
          >
            <option value="">Select your car year</option>
            {YearJson.map((year) => (
              <option value={year.value}>{year.value}</option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"number"}
            name={"carWorth"}
            required={true}
            label={"Estimated Car Worth"}
            value={states.vehicleWorth}
            onChange={(e) => {
              setStates({ ...states, vehicleWorth: e.target.value });
            }}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"email"}
            name={"email"}
            required={true}
            label={"Email"}
            value={states.email}
            onChange={(e) => setStates({ ...states, email: e.target.value })}
          />
        </div>

        <div className={"col-span-12 lg:col-span-6"}>
          <FormInputComponent
            type={"text"}
            name={"phoneNumber"}
            required={true}
            label={"Phone Number"}
            value={states.phoneNumber}
            onChange={(e) =>
              setStates({ ...states, phoneNumber: e.target.value })
            }
          />
        </div>

        <div className={"col-span-12"}>
          <ButtonComponent
            size={"base"}
            onClick={() => getEstimateAction()}
            variant={"filled"}
          >
            {uiStates.loading ? "Getting..." : "Get Estimate"}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default GetEstimateForSubscriberComponent;
