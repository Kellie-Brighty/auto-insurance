import api from "./Api";

const GetAllAgents = async () => {
  return await api.get(`/agent`);
};

const GetAllPolicies = async () => {
  return await api.get(`/policy`);
};

const AgentActivation = async (status: string, agent_id: any) => {
  return await api.post(`/agent/activation`, { status, agent_id });
};

const GetAllClaims = async () => {
  return await api.get(`/claim`);
};

const adminService = {
  GetAllAgents,
  GetAllPolicies,
  AgentActivation,
  GetAllClaims,
};

export default adminService;
