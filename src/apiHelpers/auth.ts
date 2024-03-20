import {  postApi, putAPI } from "././common/apiCall";
import apiConst from "././constant/apiConst";
import { userFactorId } from "./../store/slices/adminSlice";
import {
  signInWithEmail,
  verifyCode, sendCodeLink

} from "../libs/cognito";


export const codeVerification =async (values: any)  => {
  const verify = await verifyCode("", values)
    .then((res) => {
      return {
        message:
          "Your code has been successfully verified. You may now proceed",
        status: 1,
      };
    })
    .catch((err) => {
      // storeErrorMessage(err.message,);
      return { message: err.message, status: 0 };
    });
  return verify;
};
export const loginUser = (values: any) => async (dispatch: any) => {
  const login = await signInWithEmail(values.email, values.password)
    .then(async (res: any) => {
      var loginData = {
        primary_email: values.email,
        password: values.password,
        os_platform: values.os_platform,
        os_platform_version: values.os_platform_version,
        user_agent: values.user_agent,
        device_name: values.device_name,
        type: values.type,
        device_id: values.device_id,
        language: values.language,
        // device_token: "456",
      };
      if (res.status === 1) {
        const response = await postApi({
          endpoint: apiConst.login,
          data: loginData,
        });
        localStorage.setItem("authToken", response.jwt_token);
        localStorage.setItem(
          "device_id",
          JSON.stringify(response.info.device_id)
        );

        dispatch(userFactorId(response));

        return response;
      }
    })
    .catch((err) => {
      return { message: err.message, status: 0 };
    });
  return login;
};

export const validateUserFromBackend = (data: any) => async (dispatch: any) => {
  const response = await postApi({
    endpoint: apiConst.validateuserFromBackend,
    data: data,
  });
  return response;
};

export const forgotPasswordBackend = (values: any) => async (dispatch: any) => {
  var loginData = {
    email: values.email,
  
  };
  const response = await putAPI({
    endpoint: apiConst.forgotPassword,
    data: loginData,
  });

  return response;
};
// function storeErrorMessage(message: string | boolean | number, dispatch: any) {
//   // dispatch(errorReducer(message));
//   setTimeout(() => {
//     // dispatch(errorReducer(''));
//   }, 5000);
// }

export const sendForgotPassword = async (values: any) => {
  const codeSend = sendCodeLink(values.email)
    .then((res) => {
      return { message: res, status: 1 };
    })
    .catch((err) => {
      return { message: err.message, status: 0 };
    });
  return codeSend;
};
