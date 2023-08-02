import api from "./Api";

const SubscriberSignIn = async (email: string, password: string) => {
  return await api.post("/auth/subscriber/login", { email, password });
};

const AgentSignIn = async (email: string, password: string) => {
  return await api.post("/auth/agent/login", { email, password });
};

const AdminSignIn = async (email: string, password: string) => {
  return await api.post("/auth/admin/login", { email, password });
};

const GetVehichleEstimate = async (value: number) => {
  return await api.get(`/vehicle/getEstimate/${value}`);
};

const RegisterSubscriber = async (
  vehicleName: string,
  vehicleYear: string,
  vehicleWorth: string,
  phoneNumber: string,
  email: string,
  amount: string,
  plan: string,
  hasExcessBuyBack: boolean
) => {
  return await api.post("/subscriber/register", {
    vehicleName,
    vehicleYear,
    vehicleWorth,
    phoneNumber,
    email,
    amount,
    plan,
    hasExcessBuyBack,
  });
};

const ResendEmailConfirmation = async (email: any) => {
  return await api.get(`/auth/confirmation/resend/${email}`);
};

const VerifyUser = async (token: any) => {
  return api.get(`/auth/verify-user?token=${token}`);
};

const VerifyToken = async (token: any) => {
  return api.get(`/auth/validate-token?token=${token}`);
};

const SetPassword = async (password: any, user_id: any) => {
  return await api.post("/auth/set-password", { password, user_id });
};

const ResendSetPasswordEmail = async (email: any) => {
  return await api.get(`/auth/set-password/resend/${email}`);
};

const RegisterAgent = async (
  firstname: string,
  lastname: string,
  middlename: string,
  gender: string,
  dateofbirth: string,
  phoneNumber: string,
  email: string,
  branch: string,
  id_type: string,
  homeAddress: string
) => {
  return await api.post("/agent", {
    firstname,
    lastname,
    middlename,
    gender,
    dateofbirth,
    phoneNumber,
    email,
    branch,
    id_type,
    homeAddress,
  });
};

const authService = {
  SubscriberSignIn,
  GetVehichleEstimate,
  RegisterSubscriber,
  ResendEmailConfirmation,
  VerifyUser,
  VerifyToken,
  SetPassword,
  ResendSetPasswordEmail,
  AgentSignIn,
  AdminSignIn,
  RegisterAgent,
};

export default authService;