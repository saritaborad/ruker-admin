import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import FontConstant from "./../../Constants/FontConstant";
import ColorConstant from "./../../Constants/ColorConstant";
import AppConstant from "./../../Constants/AppConstant";

import InputField from "./../common/InputField";
import { containsEmojis } from "./../../utils/functions/commonFunctions";
import supabase from "./../../libs/SupabaseClient";
import ErrorMessage from "./../common/ErrorMessage";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import countryList from "./../../static/countryCodes.json";
import Button from "./../common/Button";
import Select from "react-select";
import { selectStep } from "./../../store/slices/adminSlice";
import { useAppSelector } from "./../../store/hooks";
import { toast } from "react-toastify";
interface Option {
  value: number;
  label: string;
}
const phoneRegExp = /^[0-9]{10}$/; // Assuming a 10-digit phone number

const UserProfile = (prop: any) => {
  const schema = yup
    .object({
      email: yup.string(),

      username: yup
        .string()
        .required("username is required.")
        .test("no-emojis", "Emojis are not allowed in email.", containsEmojis),
      firstname: yup
        .string()
        .required("firstname is required.")
        .test("no-emojis", "Emojis are not allowed in email.", containsEmojis),
      lastname: yup
        .string()
        .required("lastname is required.")
        .test("no-emojis", "Emojis are not allowed in email.", containsEmojis),
      country: yup.string().required(" country is required"),

      mobile: yup
        .string()
        .required("Phone number is required")
        .matches(phoneRegExp, "Invalid phone number")
        .test("no-emojis", "Emojis are not allowed in phone.", containsEmojis),
      organization: yup.string(),
      role: yup.string(),
      year: yup.string().required("please select your birth year."),
      month: yup.string().required("please select your birth month."),
      day: yup.string().required("please select your birth day."),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: undefined,
      email: prop?.user,
      firstname: undefined,
      lastname: undefined,
      country: undefined,
      mobile: undefined,
      organization: undefined,
      role: undefined,
      year: undefined,
      month: undefined,
      day: undefined,
    },
    resolver: yupResolver(schema),
  });
  const value = watch();
  const currentUser: any = useAppSelector(selectStep);
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<Option | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Option | null>(null);
  const [selectedDay, setSelectedDay] = useState<Option | null>(null);

  const customStyles = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "black",
      border: "1px solid #cccccc",
      outline: "none",
      boxShadow: "gray",
      marginTop: "7px",
      minHeight: "56px",
      width: "350px",
      borderRadius: "12px",

      "&:hover": {
        border: "1px solid transparent",
        backgroundColor: "#fff",
        color: "black",
      },
    }),
    option: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "black",
      fontSize: "16px",

      "&:hover": {
        border: "1px solid #000",
        backgroundColor: ColorConstant?.Orange,
        color: "#fff",
      },
    }),
  };

  const newCountry: any = countryList?.map((item: any) => ({
    ...item,
    label: item.name,
    value: item.id,
  }));
  let countryCode: any = newCountry?.find(
    (i: any) => i?.name === value?.country
  );
  const handleRegisterUser = async (props: any) => {
    const { data, error } = await supabase
      .from("user")
      .update({
        username: `${props?.username}`,
        first_name: `${props?.firstname}`,
        last_name: `${props?.lastname}`,
        phone: `${props?.mobile}`,
        organization: `${props?.organization}`,
        work_role: `${props?.role}`,
        phone_country: `${countryCode?.callingCodes[0]}`,
        dob: `${value?.year}/${value?.month}/${value?.day}`,
      })
      .eq("primary_email", `${currentUser?.email}`)
      .select();

    if (
      error?.message ===
      `duplicate key value violates unique constraint "username_unique"`
    ) {
      toast.error("this username is already taken.");
      return;
    }
    if (data !== null) {
      toast?.success("User registered successfully!");
      navigate(AppConstant?.logIn);
    }
  };

  const generateYears = () => {
    const years = [];
    for (let year = 1924; year <= 2024; year++) {
      years.push({ value: year, label: year.toString() });
    }
    return years;
  };
  // Function to generate an array of months from January to December
  const generateMonths = (): Option[] => {
    const months: Option[] = [];
    for (let month: number = 1; month <= 12; month++) {
      months.push({ value: month, label: month.toString() });
    }
    return months;
  };
  // Function to generate an array of days based on the selected month and year
  const generateDays = (): Option[] => {
    if (!selectedYear || !selectedMonth) {
      return [];
    }

    const daysInMonth = new Date(
      selectedYear.value,
      selectedMonth.value,
      0
    ).getDate();
    const days: Option[] = [];

    for (let day: number = 1; day <= daysInMonth; day++) {
      days.push({ value: day, label: day.toString() });
    }

    return days;
  };

  const handleYearChange = (selectedOption: Option | null) => {
    setSelectedYear(selectedOption);
    setSelectedMonth(null);
    setSelectedDay(null);
    setValue("year", `${selectedOption?.label}`);

    setError("year", {
      type: "manual",
    });
  };

  const handleMonthChange = (selectedOption: Option | null) => {
    setSelectedMonth(selectedOption);
    setSelectedDay(null);
    setValue("month", `${selectedOption?.label}`);
    setError("month", {
      type: "manual",
    });
  };

  const handleDayChange = (selectedOption: Option | null) => {
    setSelectedDay(selectedOption);
    setValue("day", `${selectedOption?.label}`);
    setError("day", {
      type: "manual",
    });
  };

  // const maxDayLength = 2;
  // const inputComponent = ({ inputRef, ...props }: any) => (
  //   <div>
  //     <input
  //       ref={inputRef}
  //       {...props}
  //       style={{
  //         //  borderRadius: "12px",

  //         // minHeight: "56px",
  //         // width: "250px",
  //         border: "1px solid transparent",
  //       }}
  //       maxLength={maxDayLength}
  //     />
  //   </div>
  // );
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

          padding: "64px 20px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
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
              Set up your profiles
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit((data) => handleRegisterUser(data))}>
              <Stack direction={"column"} gap={4}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  gap={10}
                >
                  <Stack>
                    Email
                    <InputField
                      val={currentUser?.email}
                      type={{ ...register("email", { required: true }) }}
                      placeholder={"Enter your email"}
                      st={{ width: "300px" }}
                    />
                    {/* {errors?.email && (
                      <ErrorMessage
                        message={errors.email && errors.email.message}
                      />
                    )} */}
                  </Stack>
                  <Stack>
                    Username*
                    <InputField
                      type={{ ...register("username", { required: true }) }}
                      placeholder={"Enter your username"}
                      st={{ width: "300px" }}
                    />
                    {errors?.username && (
                      <ErrorMessage
                        message={errors.username && errors.username.message}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  gap={10}
                >
                  <Stack>
                    First name*
                    <InputField
                      type={{ ...register("firstname", { required: true }) }}
                      placeholder={"Enter your firstname"}
                      st={{ width: "300px" }}
                    />
                    {errors?.firstname && (
                      <ErrorMessage
                        message={errors.firstname && errors.firstname.message}
                      />
                    )}
                  </Stack>
                  <Stack>
                    Last name*
                    <InputField
                      type={{ ...register("lastname", { required: true }) }}
                      placeholder={"Enter your lastname"}
                      st={{ width: "300px" }}
                    />
                    {errors?.lastname && (
                      <ErrorMessage
                        message={errors.lastname && errors.lastname.message}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  gap={10}
                >
                  <Stack>
                    Country*
                    <Select
                      options={newCountry}
                      placeholder="Select country"
                      styles={{
                        ...customStyles,
                      }}
                      // value={newCountry?.find(
                      //   (country: any) => country.label === value?.country
                      // )}
                      onChange={(selectedOption: any, v: any) => {
                        setError("country", {
                          type: "manual",
                        });
                        setValue("country", selectedOption?.label);
                      }}
                      isSearchable
                    />
                    {errors?.country && (
                      <ErrorMessage
                        message={errors?.country && errors?.country?.message}
                      />
                    )}
                  </Stack>
                  <Stack>
                    mobile*
                    <InputField
                      type={{ ...register("mobile", { required: true }) }}
                      placeholder={"xxx-xx xx xxx"}
                      st={{ width: "300px" }}
                    />
                    {errors?.mobile && (
                      <ErrorMessage
                        message={errors.mobile && errors.mobile.message}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  gap={10}
                >
                  <Stack>
                    Where do you work?
                    <InputField
                      type={{ ...register("organization", { required: true }) }}
                      placeholder={"Enter your work space"}
                      st={{ width: "300px" }}
                    />
                    {errors?.organization && (
                      <ErrorMessage
                        message={
                          errors.organization && errors.organization.message
                        }
                      />
                    )}
                  </Stack>
                  <Stack>
                    What's your title/role?
                    <InputField
                      type={{ ...register("role", { required: true }) }}
                      placeholder={"Enter your title/role"}
                      st={{ width: "300px" }}
                    />
                    {errors?.role && (
                      <ErrorMessage
                        message={errors.role && errors.role.message}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack direction={"row"}>When's your birthday?</Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-evenly"}
                  gap={1}
                >
                  <Stack>
                    Year
                    <Select
                      styles={{
                        ...customStyles,
                        control: (
                          provided: Record<string, unknown>,
                          state: any
                        ) => ({
                          ...provided,
                          borderRadius: "12px",
                          minHeight: "56px",
                          width: "250px",
                        }),
                      }}
                      isSearchable
                      options={generateYears()}
                      value={selectedYear}
                      onChange={handleYearChange}
                      placeholder="Select Year"
                    />
                    {/* <InputField
                      type={{ ...register("year", { required: true }) }}
                      placeholder={"Enter  year"}
                      st={{ width: "250px" }}
                    /> */}
                    {errors?.year && (
                      <ErrorMessage
                        message={errors.year && errors.year.message}
                      />
                    )}
                  </Stack>

                  <Stack>
                    Month
                    <Select
                      styles={{
                        ...customStyles,
                        control: (
                          provided: Record<string, unknown>,
                          state: any
                        ) => ({
                          ...provided,
                          borderRadius: "12px",
                          minHeight: "56px",
                          width: "250px",
                        }),
                      }}
                      options={generateMonths()}
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      placeholder="Select Month"
                    />
                    {/* <InputField
                      type={{ ...register("month", { required: true }) }}
                      placeholder={"Enter  month"}
                      st={{ width: "250px" }}
                    /> */}
                    {errors?.month && (
                      <ErrorMessage
                        message={errors.month && errors.month.message}
                      />
                    )}
                  </Stack>
                  <Stack>
                    Day
                    <Select
                      styles={{
                        ...customStyles,
                        control: (
                          provided: Record<string, unknown>,
                          state: any
                        ) => ({
                          ...provided,
                          borderRadius: "12px",
                          minHeight: "56px",

                          width: "250px",
                        }),
                      }}
                      // components={{ Input: inputComponent }}
                      options={generateDays()}
                      value={selectedDay}
                      onChange={handleDayChange}
                      placeholder="Select Day"
                    />
                    {/* <InputField
                      type={{ ...register("day", { required: true }) }}
                      placeholder={"Enter  day"}
                      st={{ width: "250px" }}
                    /> */}
                    {errors?.day && (
                      <ErrorMessage
                        message={errors.day && errors.day.message}
                      />
                    )}
                  </Stack>
                </Stack>
                <Stack direction={"row"} gap={10} sx={{ margin: " 20px auto" }}>
                  <Stack>
                    <div
                      onClick={() => {
                        prop?.setActiveStep(prop?.activeStep - 1);
                      }}
                    >
                      <Button
                        title={"Back"}
                        type={2}
                        st={{
                          width: "300px",
                          border: `2px solid ${ColorConstant?.Orange}`,
                        }}
                      />
                    </div>
                  </Stack>
                  <Stack>
                    <Button title={"Register"} st={{ width: "300px" }} />
                  </Stack>
                </Stack>{" "}
              </Stack>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserProfile;
