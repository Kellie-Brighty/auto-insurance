import { useEffect, useState } from "react";
import api from "../../../services/Api";

interface UserBasicInfo {
  basic_info: {
    vehicle: {
      id: number;
      vehicleName: string | null;
      vehicleYear: string | null;
      vehicleWorth: number | null;
      vehicleType: string | null;
      vehicleColor: string | null;
      plateNumber: string | null;
      engineNumber: string | null;
      chasisNumber: string | null;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      user_id: number;
    };
    policy: {
      id: number;
      policyName: string | null;
      policyNumber: string | null;
      item_value: number | null;
      policy_amount: number | null;
      hasExcessBuyBack: boolean;
      plan: string | null;
      start_date: null;
      end_date: null;
      status: string | null;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      user_id: number;
      vehicle_id: number;
    };
  };
}

const useUserBasicInfo = () => {
  const [userBasicInfo, setUserBasicInfo] = useState<UserBasicInfo | null>(
    null,
  );

  const getAndSetUserBasicInfo = () => {
    const autoFlexUserDataString = localStorage.getItem("AutoFlexUserData");

    if (autoFlexUserDataString) {
      const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
      api
        .get(`/subscriber/basic-info/${autoFlexUserData.id}`)
        .then((res) => {
          if (res.data.status === "success") {
            setUserBasicInfo(res.data.data);
            localStorage.setItem(
              "UserBasicInfo",
              JSON.stringify(res.data.data),
            );
          }
        })
        .catch((error) => {
          console.log("Something went wrong: ", error);
        });
    }
  };

  useEffect(() => {
    let _userBasicInfo = localStorage.getItem("UserBasicInfo");

    if (_userBasicInfo) {
      setUserBasicInfo(JSON.parse(_userBasicInfo) as UserBasicInfo);
    } else {
      getAndSetUserBasicInfo();
    }
  }, []);

  return { userBasicInfo, getAndSetUserBasicInfo };
};

export default useUserBasicInfo;
