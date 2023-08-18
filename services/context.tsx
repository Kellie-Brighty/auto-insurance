import React, { createContext, useEffect, useState } from "react";

interface SavedObjectType {
  email: string;
  phoneNumber: string;
  vehicleName: string;
  vehicleWorth: number;
  vehicleYear: string;
  amount: string;
  plan: string;
  hasExcessBuyBack: boolean;
}
interface GlobalContextInterface {
  estimateModal: boolean;
  setEstimateModal: React.Dispatch<React.SetStateAction<boolean>>;
  kycCompleted: boolean;
  setKycCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  savedSubscriberInfo: {
    email: string;
    phoneNumber: string;
    vehicleName: string;
    vehicleWorth: number;
    vehicleYear: string;
    amount: string;
    plan: string;
    hasExcessBuyBack: boolean;
  };
  setSavedSubscriberInfo: React.Dispatch<React.SetStateAction<SavedObjectType>>;
  agentConfirmed: boolean;
  setAgentConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialModalContext: GlobalContextInterface = {
  estimateModal: false,
  setEstimateModal: () => {},
  kycCompleted: false,
  setKycCompleted: () => {},
  savedSubscriberInfo: {
    email: "",
    phoneNumber: "",
    vehicleName: "",
    vehicleWorth: 0,
    vehicleYear: "",
    amount: "",
    plan: "",
    hasExcessBuyBack: false,
  },
  setSavedSubscriberInfo: () => {},
  agentConfirmed: false,
  setAgentConfirmed: () => {},
};

export const GlobalContext = createContext(initialModalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estimateModal, setEstimateModal] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);
  const [savedSubscriberInfo, setSavedSubscriberInfo] = useState({
    email: "",
    phoneNumber: "",
    vehicleName: "",
    vehicleWorth: 0,
    vehicleYear: "",
    amount: "",
    plan: "",
    hasExcessBuyBack: false,
  });
  const [agentConfirmed, setAgentConfirmed] = useState(false);

  useEffect(() => {
    console.log("Saved Subscriber Info", savedSubscriberInfo);
  }, [savedSubscriberInfo]);

  return (
    <GlobalContext.Provider
      value={{
        estimateModal,
        setEstimateModal,
        kycCompleted,
        setKycCompleted,
        savedSubscriberInfo,
        setSavedSubscriberInfo,
        agentConfirmed,
        setAgentConfirmed,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
