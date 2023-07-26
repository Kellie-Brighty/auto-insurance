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

const subscriberService = {
  GetPolicies,
  GetSubscriberBasicInfo,
  UpdatedSubscriberInfoKYC,
  SubscriberID,
};

export default subscriberService;
