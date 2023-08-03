import api from "./Api";

const GetPolicies = async (agentId: any) => {
  return await api.get(`/policy/agent/${agentId}`);
};

const GetCommissions = async (agentId: any) => {
  return await api.get(`commission?agent_id=${agentId}`);
};

const GetAgentVehicles = async (agentId: any) => {
  return await api.get(`vehicle?agent_id=${agentId}`);
};

const GeneratePaymentLink = async (email: any, amount: any) => {
  return await api.get(`/payment/paystack/pay?email=${email}&amount=${amount}`);
};

const agentService = {
  GetPolicies,
  GetCommissions,
  GetAgentVehicles,
  GeneratePaymentLink,
};

export default agentService;
