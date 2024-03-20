import React from "react";
import AppConstant from "../Constants/AppConstant";

const StaticData = (props:any) => {
  const renderContent = () => {
    switch (props.data) {
      case AppConstant.logIn: {
        return "rukkor admin";
      }

      case AppConstant.forgotPassword: {
        return "forgot Password";
      }
      case AppConstant.twoFactorAuth:{
        return '2fa Authentication'
      }
      case AppConstant.resetPassword:{
        return 'reset password'
      }
      case AppConstant.newPassword:{
        return 'new password'
      }
      case AppConstant.verifyMFACode:{
        return 'authentication code'
      }
      default :
      return 'rukkor admin'
    }
  };
  return (
 <>
 {renderContent()}
 </>
  )
};

export default StaticData;
