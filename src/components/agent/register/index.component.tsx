import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import ButtonComponent from "@/common/button/index.component";
import { useState } from "react";
import authService from "../../../../services/auth.service";
import { useRouter } from "next/router";
import States from "./states.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterAgentComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [idType, setIdType] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { RegisterAgent } = authService;
  const router = useRouter();

  const registerAgentAction = async () => {
    const data = {
      firstName,
      lastName,
      middleName,
      gender,
      dob,
      phone,
      email,
      branch,
      idType,
      address,
    };
    console.log("data:::", data);
    setLoading(true);
    setError("");
    if (
      firstName === "" ||
      lastName === "" ||
      middleName === "" ||
      gender === "" ||
      dob === "" ||
      phone === "" ||
      email === "" ||
      branch === "" ||
      idType === "" ||
      address === ""
    ) {
      setLoading(false);
      setError("No field can be empty");
      toast.error("No field can be empty");
    } else {
      try {
        const res = await RegisterAgent(
          firstName,
          lastName,
          middleName,
          gender,
          dob,
          phone,
          email,
          branch,
          idType,
          address
        );

        console.log(res.data);
        if (res.status === 200 || res.status === 201) {
          router.push("/auth/validate-token");
          setLoading(false);
        }
      } catch (err: any) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        toast.error(err.response.data.message);
        setLoading(false);
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
          Register As An Agent
        </h1>
      </div>

      <div className={"p-8 grid grid-cols-12 gap-3"}>
        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            type={"text"}
            name={"firstName"}
            required={true}
            label={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            type={"text"}
            name={"lastName"}
            required={true}
            label={"Last Name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            type={"text"}
            name={"middleName"}
            required={true}
            label={"Middle Name"}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormSelectComponent
            name={"gender"}
            required={true}
            label={"Gender"}
            value={gender}
            onChange={(e) => {
              console.log("selected gender:::", e.target.value);
              setGender(e.target.value);
            }}
          >
            <option value="">Select Gender</option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"others"}>Others</option>
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            type={"date"}
            name={"dob"}
            required={true}
            label={"Date Of Birth"}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            type={"email"}
            name={"email"}
            required={true}
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormInputComponent
            type={"text"}
            name={"phoneNumber"}
            required={true}
            label={"Phone Number"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormSelectComponent
            name={"brand"}
            required={true}
            label={"Branch"}
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option>Choose your state</option>
            {States.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </FormSelectComponent>
        </div>

        <div className={"col-span-12 lg:col-span-4"}>
          <FormSelectComponent
            name={"brand"}
            required={true}
            label={"Means of Identification"}
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option>Select here</option>
            <option value={"National Identification Card"}>
              National Identification Card
            </option>
            <option value={"International Passport"}>
              International Passport
            </option>
            <option value={"Driver License"}>Driver&apos;s License</option>
            <option value={"Voter Card"}>Voter&apos;s Card</option>
            <option value={"Passport Photograph"}>Passport Photograph</option>
          </FormSelectComponent>
        </div>

        <div className={"col-span-12"}>
          <FormInputComponent
            type={"text"}
            name={"agentAddress"}
            required={true}
            label={"Agent Address"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={"col-span-12"}>
          <ButtonComponent
            size={"base"}
            variant={"filled"}
            onClick={registerAgentAction}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default RegisterAgentComponent;
