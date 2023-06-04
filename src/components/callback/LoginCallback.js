import React from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const LoginCallback = () => {
  const location = useLocation();
  const code = location.search.split("=")[1];
  const login = async () => {
    try{
    const response = await axios.post("/api/auth/kakao", {code : code});
      console.log(response.data);
    }catch(err) {
      console.log(err);
    }

  };

  login();

  return <div>LoginCallback</div>;
};

export default LoginCallback;
