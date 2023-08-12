import PaymentDetailsComponent from "@/common/app/kyc-steps/payment-details";
import PersonalDetailsComponent, {
  PersonalDetails,
} from "@/common/app/kyc-steps/personal-details-agent";
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
import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../../../../services/Api";
import Image from "next/image";
import AgentLayout from "@/layouts/agent/index.layout";
import DialogComponent from "@/common/dialog/index.component";
import agentService from "../../../../services/agent.service";
import { GlobalContext } from "../../../../services/context";

const AgentKycStepsComponent = () => {
  const { userBasicInfo } = useUserBasicInfo();

  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copyState, setCopyState] = useState(false);
  const [linkToCpy, setLinkToCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { setAgentConfirmed } = useContext(GlobalContext);

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToCpy).then(() => {
      setIsCopied(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    middleName: "",
    lastName: "",
    homeAddress: "",
    modeOfIdentification: "",
    idCardFront: "",
    idCardBack: "",
    email: "",
    phoneNumber: "",
  });

  const setUserdata = () => {
    const userDataString = localStorage.getItem("AutoFlexUserData");

    if (userDataString) {
      const userData = JSON.parse(userDataString) as any;
      console.log("user details in agent kyc:::", userData);
      setPersonalDetails({
        ...personalDetails,
        firstName: userData.firstname,
        lastName: userData.lastname,
        middleName: userData.middlename,
        homeAddress: userData.homeAddress,
        modeOfIdentification: userData.id_type,
        idCardFront: userData.idCardFront,
        idCardBack: userData.idCardBack,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    }
  };

  useEffect(() => {
    setUserdata();
  }, []);

  const handleSubmitAgentDetails = async () => {
    const autoFlexUserDataString = localStorage.getItem("AutoFlexUserData");

    if (autoFlexUserDataString) {
      const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
      setLoading(true);

      try {
        const idCardFrontURL = await uploadBase64ImageToFirebaseStorage(
          personalDetails.idCardFront,
          `${uuidv4()}.png`
        );

        const idCardBackURL = await uploadBase64ImageToFirebaseStorage(
          personalDetails.idCardBack,
          `${uuidv4()}.png`
        );

        await api.put(`/agent/${autoFlexUserData.id}`, {
          firstname: personalDetails.firstName,
          lastname: personalDetails.lastName,
          middlename: personalDetails.middleName,
          homeAddress: personalDetails.homeAddress,
          agent_id: autoFlexUserData.id,
          email: personalDetails.email,
          phoneNumber: personalDetails.phoneNumber,
          id_type: personalDetails.modeOfIdentification,
        });

        const res = await api.post(`/agent/id-card`, {
          id_front: idCardFrontURL,
          id_back: idCardBackURL,
          agent_id: autoFlexUserData.id,
        });

        if (res.status === 200 || res.status === 201) {
          alert("success");
          setAgentConfirmed(true);
        }
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong: ", error);
        setLoading(false);
        return;
      }
    }
  };

  // useEffect(() => {
  //   setVehicleDetails((prev) => ({
  //     ...prev,
  //     vehicleName: userBasicInfo?.basic_info.vehicle.vehicleName || "",
  //     vehicleYear: userBasicInfo?.basic_info.vehicle.vehicleYear || "",
  //     vehicleType: userBasicInfo?.basic_info.vehicle.vehicleType || "",
  //     vehicleColor: userBasicInfo?.basic_info.vehicle.vehicleColor || "",
  //     plateNumber: userBasicInfo?.basic_info.vehicle.plateNumber || "",
  //     engineNumber: userBasicInfo?.basic_info.vehicle.engineNumber || "",
  //     chassisNumber: userBasicInfo?.basic_info.vehicle.chasisNumber || "",
  //   }));
  // }, [userBasicInfo]);

  return (
    <AgentLayout
      title={"Complete KYC Information"}
      caption={"Provide your personal details to complete your KYC."}
    >
      <div className={"space-y-8"}>
        {/* <StepsComponent steps={steps} /> */}

        <PersonalDetailsComponent
          personalDetails={personalDetails}
          setPersonalDetails={setPersonalDetails}
        />

        {/* <DialogComponent show={copyState} onClose={() => setCopyState(false)}>
          <div className={`p-[24px]`}>
            <p className={`text-[24px] font-bold font-grotesk`}>
              Send the referral link{" "}
            </p>
            <p className={`mt-[8px] text-[#64748B] text-[15px]`}>
              Send referral link to subscriber to make for the policy{" "}
            </p>

            <div
              className={`mt-[24px] border-[#DCE5F0] border-[1px] 
              rounded-full flex items-center p-[16px] justify-between`}
            >
              <p
                className={`font-inter font-semibold text-[#64748B] text-[16px]`}
              >
                {linkToCpy ? linkToCpy : null}
              </p>
              <div
                className={`flex items-center space-x-5 cursor-pointer`}
                onClick={handleCopy}
              >
                <Image
                  src={"/assets/agent/copy-gray.svg"}
                  alt="copy"
                  width={22}
                  height={22}
                />
                <p
                  className={`font-inter font-semibold text-[#64748B] text-[16px]`}
                >
                  {isCopied ? "Copied to clipboard" : "Copy link"}
                </p>
              </div>
            </div>
          </div>
        </DialogComponent> */}

        <div className={"flex items-center justify-end gap-3"}>
          <ButtonComponent
            size={"base"}
            variant={"filled"}
            onClick={handleSubmitAgentDetails}
          >
            {loading ? "Wait..." : "Submit"}
          </ButtonComponent>
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentKycStepsComponent;
