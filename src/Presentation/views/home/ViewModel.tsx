import React, { useState } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";
import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { useUserLocal } from "../../hooks/useUserLocal";

const HomeViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    dni: "",
    password: "",
  });
  const { user, getUserSession } = useUserLocal();
  console.log("Usuario en Sesion : " + JSON.stringify(user));

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.dni, values.password);
      console.log("response : " + JSON.stringify(response));
      if (!response.status) {
        setErrorMessage(response.msg);
      }else{
        await SaveUserLocalUseCase(response.data);
		getUserSession();
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.dni === "") {
      setErrorMessage("Ingrese un Dni valido");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingrese un password");
      return false;
    }
    return true;
  };

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };
  return {
    ...values,
    user,
    onChange,
    errorMessage,
    login,
  };
};

export default HomeViewModel;
