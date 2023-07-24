import api from "./Api";

const GetPolicies = async () => {
  return await api.get(`/policy`);
};

const subscriberService = { GetPolicies };

export default subscriberService;
