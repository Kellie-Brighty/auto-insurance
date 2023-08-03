import React, { createContext, useEffect, useState } from "react";

interface GlobalContextInterface {
  estimateModal: boolean;
  setEstimateModal: React.Dispatch<React.SetStateAction<boolean>>;
  kycCompleted: boolean;
  setKycCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialModalContext: GlobalContextInterface = {
  estimateModal: false,
  setEstimateModal: () => {},
  kycCompleted: false,
  setKycCompleted: () => {},
};

export const GlobalContext = createContext(initialModalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estimateModal, setEstimateModal] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);

  // useEffect(() => {
  //   console.log("Sub Basic Info in context", subscriberBasicInfo);
  // }, [subscriberBasicInfo]);

  return (
    <GlobalContext.Provider
      value={{
        estimateModal,
        setEstimateModal,
        kycCompleted,
        setKycCompleted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
