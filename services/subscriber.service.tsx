import api from "./Api";

const GetPolicies = async (userId: any) => {
  return await api.get(`/policy/user/${userId}`);
};

const subscriberService = { GetPolicies };

export default subscriberService;
