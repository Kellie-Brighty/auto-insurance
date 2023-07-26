import api from "./Api";

const GetAllAgents = async () => {
  return await api.get(`/agent`);
};

const GetAllPolicies = async () => {
  return await api.get(`/policy`);
};

const adminService = {
  GetAllAgents,
  GetAllPolicies,
};

export default adminService;
