import React, { FunctionComponent, useEffect } from "react";
import { UserData } from "../types";

interface LoginFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({
  userData,
  setUserData,
}) => {
  useEffect(() => {
    
  }, []);
  return userData.id === -1 ? <>{/* not logged in*/}</> : <>{/* logged in*/}</>;
};

export default LoginForm;
