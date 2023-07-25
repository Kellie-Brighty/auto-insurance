import api from "./Api";

const GetAllAgents = async () => {
  return await api.get(`/agent`);
};

const adminService = {
  GetAllAgents,
};

export default adminService;
