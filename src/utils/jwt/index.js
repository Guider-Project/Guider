const axios = require("axios");
const JWT = require("jsonwebtoken");

exports.getToken = async () => {
  try {
    const response = await axios.get("/api/token");
    return response.data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.verifyJWT = (token, secret) => {
  try {
    return JWT.verify(token, secret);
  } catch (error) {
    return false;
  }
};
