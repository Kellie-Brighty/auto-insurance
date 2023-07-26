import React, { createContext, useEffect, useState } from "react";

interface GlobalContextInterface {
  estimateModal: boolean;
  setEstimateModal: React.Dispatch<React.SetStateAction<boolean>>;
  subscriberBasicInfo: SubscriberBsicInfoInterface | null;
  setSubscriberBasicInfo: React.Dispatch<
    React.SetStateAction<SubscriberBsicInfoInterface | null>
  >;
}

const initialModalContext: GlobalContextInterface = {
  estimateModal: false,
  setEstimateModal: () => {},
  subscriberBasicInfo: null,
  setSubscriberBasicInfo: () => {},
};

interface SubscriberBsicInfoInterface {
  policy: {
    createdAt: string;
    deletedAt: null;
    end_date: null;
    hasExcessBuyBack: boolean;
    id: number;
    item_value: number;
    plan: string;
    policyName: string;
    policyNumber: null;
    policy_amount: number;
    start_date: null;
    status: string;
    updatedAt: string;
    user_id: number;
    vehicle_id: number;
  };
  vehicle: {
    chasisNumber: null;
    createdAt: string;
    deletedAt: null;
    engineNumber: null;
    id: number;
    plateNumber: null;
    updatedAt: string;
    user_id: number;
    vehicleColor: null;
    vehicleName: string;
    vehicleType: null;
    vehicleWorth: number;
    vehicleYear: string;
  };
}

export const GlobalContext = createContext(initialModalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estimateModal, setEstimateModal] = useState(false);
  const [subscriberBasicInfo, setSubscriberBasicInfo] =
    useState<SubscriberBsicInfoInterface | null>(null);

  // useEffect(() => {
  //   console.log("Sub Basic Info in context", subscriberBasicInfo);
  // }, [subscriberBasicInfo]);

  return (
    <GlobalContext.Provider
      value={{
        estimateModal,
        setEstimateModal,
        subscriberBasicInfo,
        setSubscriberBasicInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
