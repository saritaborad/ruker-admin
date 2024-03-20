import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { COGNITO, AWS3 } from "../configs/aws";
//   import { RNS3 } from 'react-native-aws3';
import AWS from "aws-sdk";
//   import { Platform } from 'react-native';
import { Amplify } from "aws-amplify";
//   import * as navigation from '../navigation/RootNavigation';
//   import ImageResizer from 'react-native-image-resizer';
//   import appConstant from '../configs/appConstant';
//   import localStorage from '@react-native-async-storage/async-storage';
// import AppConstant from "../Constants/AppConstant";
// import { useNavigate } from "react-router-dom";
const userPoolId = COGNITO.USER_POOL_ID;
const clientId = COGNITO.APP_CLIENT_ID;
Amplify.configure({
  Auth: {
    Cognito: {
      // region: COGNITO.REGION,
      userPoolClientId: COGNITO.APP_CLIENT_ID,
      userPoolId: COGNITO.USER_POOL_ID,
    },
  },
});

const poolData = {
  UserPoolId: `${userPoolId}`,
  ClientId: `${clientId}`,
};

// const S3_BUCKET = AWS3.BUCKET;
// const REGION = COGNITO.REGION;

AWS.config.update({
  accessKeyId: AWS3.ACCESS_KEY,
  secretAccessKey: AWS3.SECRET_KEY,
});

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// });

// const cognito = new AWS.CognitoIdentityServiceProvider({
//   region: "eu-north-1",
// });

const userPool: CognitoUserPool = new CognitoUserPool(poolData);
const SoftwareTokenMfaSettings = {
  Enabled: true,
  PreferredMfa: true,
};

let currentUser: any = userPool.getCurrentUser();
export function getCurrentUser() {
  return currentUser;
}

export function getCognitoUser(username: string) {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return cognitoUser;
}

export async function getSession() {
  if (!currentUser) {
    currentUser = userPool.getCurrentUser();
  }

  return new Promise(function (resolve, reject) {
    currentUser.getSession(function (err: any, session: any) {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function signUpUserWithEmail(
  username: string,
  email: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];
    userPool.signUp(
      username,
      password,
      attributeList,
      [],
      function (err: any, res: unknown) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  }).catch((err) => {
    return err;
  });
}

export async function verifyCode(username: string, code: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);
    cognitoUser.confirmRegistration(
      code,
      true,
      function (err: any, result: unknown) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  }).catch((err) => {
    throw err;
  });
}

export async function signInWithEmail(username: string, password: string) {
  return new Promise(async function (resolve, reject) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails: any = new AuthenticationDetails(
      authenticationData
    );
    const userData = {
      Username: username,
      Pool: new CognitoUserPool(poolData),
    };

    const cognitoUser = new CognitoUser(userData);
    currentUser = getCognitoUser(username);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (res) {
        cognitoUser.getUserData((err, data) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            reject(err);
            return;
          }
          if (data && data?.PreferredMfaSetting !== "SOFTWARE_TOKEN_MFA") {
            setupMFA();
          }
        });
      },

      newPasswordRequired: function () {
        cognitoUser.completeNewPasswordChallenge(password, {}, this);
      },
      totpRequired: async function () {
        await localStorage.removeItem("code");

        // const getCode = await localStorage.getItem("code");

        // navigate(AppConstant.twoFactorAuth);

        let intervalId: any;
        let setupIntervalId: any;
        let failedAttempts = 0;
        const setupTOTPRequired = async () => {
          const challengeAnswer = await localStorage.getItem("code");
          if (challengeAnswer) {
            clearInterval(intervalId);
            clearInterval(setupIntervalId);

            cognitoUser.sendMFACode(
              challengeAnswer,
              {
                onFailure: async function (err) {
                  await localStorage.removeItem("code");
                  failedAttempts++;
                  if (failedAttempts < 3) {
                    // navigate(AppConstant.twoFactorAuth,
                    // //      {
                    // //     failedAttemptsLogin: failedAttempts,
                    // //   }
                    //   );
                  }

                  if (failedAttempts >= 3) {
                    clearInterval(intervalId);
                    clearInterval(setupIntervalId);
                    failedAttempts = 0;
                    //   navigation.navigationRef.reset({
                    //     index: 0,
                    //     routes: [{ name: appConstant.Login }],
                    //   });
                    reject(err);
                  } else {
                    // setupWrongOTP();
                  }
                },
                onSuccess: async function (result) {
                  await localStorage.removeItem("code");
                  // let pushToken: any = await localStorage.getItem("fcmToken");
                  // await localStorage.setItem("device_token", pushToken);
                  clearInterval(intervalId);
                  clearInterval(setupIntervalId);
                  resolve({ result, status: 1 });
                },
              },
              "SOFTWARE_TOKEN_MFA"
            );
          }
        };

        //DO NOT DELETE
        // const setupWrongOTP = () => {
        //   clearInterval(intervalId);
        //   clearInterval(setupIntervalId);

        //   localStorage.removeItem("code");

        //   // navigation.navigate(appConstant.Authenticator);

        //   setupIntervalId = setInterval(setupTOTPRequired, 1000);
        // };

        intervalId = setInterval(setupTOTPRequired, 1000);

        // setupWrongOTP();
        // return new Promise((resolve, reject) => {
        //   resolvePromise = resolve;
        //   rejectPromise = reject;

        //   setupWrongOTP();
        // });
      },

      onFailure: function (err: any) {
        reject(err);
      },
    });

    let intervalId: any;

    const setupMFA = () => {
      let failedAttempts: number = 0;

      const verifyChallengeAnswer = async (challengeAnswer: any) => {
        clearInterval(intervalId);
        cognitoUser.verifySoftwareToken(challengeAnswer, "My TOTP device", {
          onFailure: async function (err) {
            console.log("error-------", err);

            await localStorage.removeItem("code");

            failedAttempts++;
            //   navigation.navigate(appConstant.Authenticator, {
            //     failedAttempts: failedAttempts,
            //   });

            if (failedAttempts >= 2) {
              // Redirect to login screen after three failed attempts

              if (failedAttempts === 2) {
                failedAttempts = 0;
                const removeValue = async () => {
                  try {
                    await localStorage.removeItem("retryCount");
                  } catch (e) {
                    console.log("remove error======", e);
                  }
                };
                removeValue();
              }
              // await localStorage.removeItem("retryCount")
              clearInterval(intervalId);

              reject(err);
            } else {
              if (failedAttempts === 1) {
                await localStorage.setItem("retryCount", "2");
              }

              startInterval();
              // reject(err);
            }
          },
          onSuccess: async function (result) {
            await localStorage.setItem("retryCount", "3");
            enableMFA();
            // await localStorage.removeItem("code");
            resolve({ result, status: 1 });
          },
        });
      };

      const startInterval = () => {
        intervalId = setInterval(async () => {
          const challengeAnswer = await localStorage.getItem("code");
          if (challengeAnswer) {
            verifyChallengeAnswer(challengeAnswer);
          }
        }, 1000);
      };

      cognitoUser.associateSoftwareToken({
        associateSecretCode: async function (secretCode) {
          const url = `otpauth://totp/${username}?secret=${secretCode}&issuer=Cognito-TOTP-MFA`;
          localStorage.setItem("url", url);
          localStorage.setItem("secretCode", secretCode);

          // await localStorage.removeItem("code");
          startInterval();
        },
        onFailure: function (err) {
          console.error(err.message || JSON.stringify(err));
        },
      });
    };
    const enableMFA = () => {

      cognitoUser.setUserMfaPreference(
        null,
        SoftwareTokenMfaSettings,

        function (err, result: any) {
          if (err) {
            console.log("err", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    };
  }).catch((err) => {
    throw err;
  });
}

export async function getAttributes() {
  return new Promise(function (resolve, reject) {
    currentUser.getUserAttributes(function (err: any, attributes: any) {
      if (err) {
        reject(err);
      } else {
        resolve(attributes);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function setAttribute(attributes: any) {
  return new Promise(async function (resolve, reject) {
    let finalUrl: any = "";
    const attributeList: any = [];

    for (let a = 0; a < attributes.length; a++) {
      if (attributes[a]) {
        let attribute = {
          Name: attributes[a].Name,
          Value:
            attributes[a].Name === "picture" ? finalUrl : attributes[a].Value,
        };
        let userAttribute = new CognitoUserAttribute(attribute);
        attributeList.push(userAttribute);
      }
    }

    const cognitoUser = getCurrentUser();
    cognitoUser.getSession(function (err: any, res: any) {
      if (res) {
        currentUser.updateAttributes(
          attributeList,
          function (err: any, result: any) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
            cognitoUser.getUserAttributes(function (err: any, result: any) {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }
        );
      }
    });
  }).catch((err) => {
    throw err;
  });
}
export function signOut() {
  if (currentUser) {
    currentUser.signOut();
  }
}
export async function sendCode(username: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);
    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }
    cognitoUser.resendConfirmationCode((error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function sendCodeLink(username: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.forgotPassword({
      onSuccess: function (res) {
        resolve(res);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function forgotPassword(
  username: string,
  code: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function () {
        resolve("password updated");
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  });
}

export async function changePassword(oldPassword: string, newPassword: string) {
  return new Promise(function (resolve, reject) {
    currentUser.changePassword(
      oldPassword,
      newPassword,
      function (err: any, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}
