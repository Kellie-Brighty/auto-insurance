const getLocalAccessToken = () => {
  const user = localStorage.getItem("AutoFlexUserToken");
  return user;
};

const TokenService = {
  getLocalAccessToken,
};

export default TokenService;
