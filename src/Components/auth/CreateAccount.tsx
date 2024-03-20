import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import FontConstant from "../../Constants/FontConstant";
import ColorConstant from "../../Constants/ColorConstant";
import ImageConst from "../../Constants/ImageConst";
import InputField from "../common/InputField";
import {
  containsEmojis,
  specialCharRegex,
} from "../../utils/functions/commonFunctions";
import Tooltips from "../common/Tooltips";
import supabase from "../../libs/SupabaseClient";
import ErrorMessage from "../common/ErrorMessage";
import { useAppDispatch } from "./../../store/hooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { newStep } from "./../../store/slices/adminSlice";
import Button from "../common/Button";
const CreateAccount = (prop: any) => {
  const schema = yup
    .object({
      email: yup
        .string()
        .required("email is required.")
        .matches(/^\S+$/, "email should not contain whitespaces.")
        .test("no-emojis", "Emojis are not allowed in email.", containsEmojis)
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email address."),
      password: yup
        .string()
        .required("password is required.")
        .matches(/^\S+$/, "no white spaces allowed.")
        .min(8, "Must Contain 8 Characters.")
        // .max(19, "password can be the max. length of 20 characters.")
        .test(
          "no-emojis",
          "Emojis are not allowed in password.",
          containsEmojis
        )
        .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character.")
        .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character.")
        .matches(specialCharRegex, "Must Contain  One Special Case Character."),

      confirmpassword: yup
        .string()
        .required("confirm password is required.")
        .test(
          "passwords-match",
          "Your passwords do not match.",
          function (value) {
            if (this.parent.password === value) {
              return true;
            } else {
              return false;
            }
          }
        ),
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { password: undefined, email: undefined },
    resolver: yupResolver(schema),
  });

  const values = watch();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmpassword, setIsVisibleConfirmpassword] =
    useState(false);
  const toggleVisibility: any = () => {
    setIsVisible(!isVisible);
  };
  // used to toggle visisbility of confirm password
  const toggleVisibilityforConfirmPassword: any = () => {
    setIsVisibleConfirmpassword(!isVisibleConfirmpassword);
  };

  const signUpuser = async (props: any) => {
    const { data } = await supabase.auth.signUp({
      email: props?.email,
      password: props?.password,
    });

    if (data?.user?.identities?.length === 0) {
      toast?.error("This user already exists!");
      return;
    } else {
      prop?.setUser(props?.email);
      prop?.setActiveStep(prop?.activeStep + 1);
      dispatch(newStep({ email: values?.email, step: 1 }));
    }
  };

  useEffect(() => {
    dispatch(newStep(null));
  }, [dispatch]);

  return (
    <>
      <Card
        style={{
          boxShadow: "0 4px 6px gray",
          border: "1px solid transparent",
          borderRadius: "30px",
          background: ColorConstant.white,
          // padding:"20% 20%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "64px 120px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            //   width: "600px",
            //   justifyContent: "center",
            //   alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "inherit",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: FontConstant?.FONTSIZE_36,
                fontWeight: FontConstant?.FONTWEIGHT_600,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Create new account
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Turpis gravida senectus
              dignissim donec.
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Enim donec amet ultricies tempus elit sed ac amet amet.
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit((data) => signUpuser(data))}>
            <div
              style={{
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_16,
                //   marginBottom: "32px",
              }}
            >
              Email
            </div>
            <InputField
              type={{ ...register("email", { required: true }) }}
              placeholder={"Enter your email"}
            />

            {errors?.email && (
              <ErrorMessage message={errors.email && errors.email.message} />
            )}
            <div
              style={{
                marginTop: "32px",
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_16,
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              Password{" "}
              <span
                style={{
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "row",
                  margin: "auto 5px",
                }}
              >
                {" "}
                <Tooltips />
              </span>
            </div>
            <div
              style={{
                position: "relative",
              }}
            >
              <InputField
                type={{ ...register("password", { required: true }) }}
                placeholder={"Enter your password"}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                toggleVisibility={toggleVisibility}
                //   st={{width:"500px"}}
              />
            </div>
            {errors?.password && (
              <ErrorMessage
                message={errors.password && errors?.password?.message}
              />
            )}
            <div
              style={{
                marginTop: "32px",
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_16,
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              Confirm Password{" "}
              <span
                style={{
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "row",
                  margin: "auto 5px",
                }}
              >
                {" "}
                <Tooltips />
              </span>
            </div>
            <div
              style={{
                position: "relative",
              }}
            >
              <InputField
                type={{ ...register("confirmpassword", { required: true }) }}
                placeholder={"Confirm your password"}
                isVisible={isVisibleConfirmpassword}
                setIsVisible={setIsVisibleConfirmpassword}
                toggleVisibility={toggleVisibilityforConfirmPassword}
                //   st={{width:"500px"}}
              />
            </div>
            {
              <ErrorMessage
                message={
                  values?.password?.length > 0 &&
                  values?.confirmpassword?.length > 0 &&
                  values?.confirmpassword === values?.password
                    ? " "
                    : errors.confirmpassword && errors.confirmpassword.message
                }
              />
            }
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                width:"570px",
                //   justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                title={"Next"}
                endContent={
                  <img
                    src={ImageConst.forward_icon}
                    alt="back"
                    style={{ marginRight: "5px" }}
                  />
                }
                st={{}}
              />
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateAccount;
