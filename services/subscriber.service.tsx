import api from "./Api";

const GetPolicies = async (userId: any) => {
  return await api.get(`/policy/user/${userId}`);
};

const GetSubscriberBasicInfo = async (userId: any) => {
  return await api.get(`/subscriber/basic-info/${userId}`);
};

const UpdatedSubscriberInfoKYC = async (
  firstName: string,
  middlename: string,
  lastname: string,
  homeAddress: string,
  id_type: string,
  user_id: any
) => {
  return await api.put(`/subscriber/${user_id}`, {
    firstName,
    middlename,
    lastname,
    homeAddress,
    id_type,
  });
};

const SubscriberID = async (
  id_front: string,
  id_back: string,
  user_id: any
) => {
  return await api.post(
    `/subscriber/id-card`,
    {
      id_front,
      id_back,
      user_id,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const GetSubscriberVehicles = async (user_id: any, page: any) => {
  return await api.get(`vehicle?user_id=${user_id}&page=${page}`);
};

const CreateVehicle = async (
  user_id: any,
  vehicleYear: string,
  vehicleWorth: string,
  vehicleColor: string,
  vehicleName: string,
  vehicleType: string,
  plateNumber: string,
  chasisNumber: string,
  engineNumber: string
) => {
  return await api.post(`/vehicle`, {
    user_id,
    vehicleYear,
    vehicleWorth,
    vehicleColor,
    vehicleName,
    vehicleType,
    plateNumber,
    chasisNumber,
    engineNumber,
  });
};

const GetPayments = async (user_id: any) => {
  return await api.get(`/payment?user_id=${user_id}`);
};

const MakePayment = async (email: any, amount: any) => {
  return await api.get(`/payment/paystack/pay?email=${email}&amount=${amount}`);
};

const VerifyPayment = async (reference: any, policy_id: any) => {
  return await api.post(`/payment/paystack/confirm`, { reference, policy_id });
};

const FetchKYCStatus = async (user_id: any) => {
  return await api.get(`/subscriber/kyc-status?user_id=${user_id}`);
};

const subscriberService = {
  GetPolicies,
  GetSubscriberBasicInfo,
  UpdatedSubscriberInfoKYC,
  SubscriberID,
  GetSubscriberVehicles,
  CreateVehicle,
  GetPayments,
  MakePayment,
  VerifyPayment,
  FetchKYCStatus,
};

export default subscriberService;
