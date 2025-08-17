/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  validateRegistrationForm,
  transformAffiliateRegistrationData,
} from "../lib/utils/validation";
import "./Register.scss";

import "react-toastify/dist/ReactToastify.css";
import { showToaster } from "../lib/utils/toast";
import axios from "axios";
import { API_CONFIG, API_ENDPOINTS } from "../lib/api/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import signup3 from "../assets/signup3.jpg";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refCodeParam =
    searchParams.get("refCode") || searchParams.get("refcode");
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);

  const [currentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    currencyType: "8", // Default to BDT
    friendReferCode: "",
    realName: "",
    callingCode: "880", // Default to +880
    phoneNumber: "",
    email: "",
    captchaInput: "",
    ageCheck: true,
    role: "superAffiliate",
    refCode: refCodeParam,
  });

  console.log({ refCodeParam });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const bannerImages = [
    {
      id: 1,
      image: signup3,
      title: "Welcome to GameStar365",
      description: "Join our gaming community today!",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const validation = validateRegistrationForm(formData);
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      // Validate step 1 fields
      validation.errors.forEach((error) => {
        if (
          [
            "username",
            "password",
            "confirmPassword",
            "currencyType",
            "realName",
            "phoneNumber",
            "email",
          ].includes(error.field)
        ) {
          stepErrors[error.field] = error.message;
        }
      });
    } else if (step === 2) {
      // Validate step 2 fields
      validation.errors.forEach((error) => {
        if (["realName", "phoneNumber", "email"].includes(error.field)) {
          stepErrors[error.field] = error.message;
        }
      });
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  console.log(errors);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) {
      return;
    }

    // Validate entire form
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      console.log(formData);
      // Transform form data to API format
      const apiData = {
        ...transformAffiliateRegistrationData(formData),
        refer_code: formData.refCode,
      };

      // Call registration API
      // const response = await registerMutation.mutateAsync(apiData);
      console.log(apiData);
      // return;
      const response = await axios.post(
        API_CONFIG.BASE_URL + API_ENDPOINTS.AUTH.AFFILIATE_REGISTER,
        apiData
      );
      // `/api/admin/create-admin`,

      // Success - user will be automatically logged in and redirected
      console.log("Registration successful:", response.data);
      setLoading(false);

      // Show beautiful toast notification
      showToaster(
        "Registration successful! Welcome to GameStar365!",
        "success"
      );

      // Redirect to home page or dashboard
      navigate("/");
    } catch (error: unknown) {
      setLoading(false);
      let errorMessage = "Registration failed. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string"
      ) {
        errorMessage = (error as any).message;
      }
      showToaster(errorMessage, "error");
    }
  };

  const getFieldError = (fieldName: string): string => {
    return errors[fieldName] || "";
  };

  const isFieldValid = (fieldName: string): boolean => {
    return !errors[fieldName];
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: phoneValue || "",
    }));
  }, [phoneValue]);

  return (
    <div className="register-page">
      <div className="register-wrap">
        {/* General Error Display */}
        {errors.general && (
          <div
            className="error-message"
            style={{
              background: "rgba(255, 0, 0, 0.1)",
              border: "1px solid #ff0000",
              color: "#ff0000",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {errors.general}
          </div>
        )}

        <div className="register-content">
          <div className="left-register-info">
            <div className="header-auth  mb-5">
              <p className="signup-btn w-full !py-2 pointer-events-none select-none !text-base !font-semibold !capitalize">
                Register as an affiliate with just one click and connect with
                us.
              </p>
            </div>
            <div className="general-register step-register text-left">
              <form onSubmit={handleFormSubmit}>
                {currentStep === 1 && (
                  <div id="register-form-step1" className="form-inner v2_step1">
                    <ul>
                      <li>
                        <label htmlFor="refCode">Referral Code</label>
                        <input
                          id="refCode"
                          name="refCode"
                          type="text"
                          value={formData.refCode || ""}
                          onChange={handleInputChange}
                          placeholder="Referral code"
                          readOnly={!!refCodeParam}
                          style={{
                            borderColor: isFieldValid("refCode")
                              ? undefined
                              : "#ff0000",
                          }}
                        />
                        {getFieldError("refCode") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("refCode")}
                          </div>
                        )}
                      </li>
                      <li>
                        <label htmlFor="realName">Full Name</label>
                        <input
                          id="realName"
                          type="text"
                          name="realName"
                          placeholder="Enter your full name"
                          maxLength={100}
                          style={{
                            borderColor: isFieldValid("realName")
                              ? undefined
                              : "#ff0000",
                          }}
                          required
                          value={formData.realName}
                          onChange={handleInputChange}
                        />
                        {getFieldError("realName") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("realName")}
                          </div>
                        )}
                        <div className="password-condition">
                          <p>
                            Please enter your full and accurate name for
                            identity verification during withdrawal.
                          </p>
                        </div>
                      </li>
                      {/* <li className="">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="phone-info ">
                          <div className="phone-area-code">
                            <div className="lang-select">
                              <button
                                type="button"
                                className="btn-select"
                                value="en"
                              >
                                <li className="flex items-center !mb-0">
                                  <img
                                    src="https://img.b112j.com/images/web/flag/BD.png"
                                    alt=""
                                  />
                                  <span>+{formData.callingCode}</span>
                                </li>
                              </button>
                            </div>
                          </div>
                          <input
                            id="callingCode"
                            name="callingCode"
                            type="hidden"
                            value={formData.callingCode}
                            onChange={handleInputChange}
                          />
                          <input
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            style={{
                              borderColor: isFieldValid("phoneNumber")
                                ? undefined
                                : "#ff0000",
                            }}
                            required
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        {getFieldError("phoneNumber") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("phoneNumber")}
                          </div>
                        )}
                      </li> */}

                      <li className="">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="phone-info">
                          <div className="phone-area-code">
                            <div className="lang-select">
                              <li className="flex items-center !mb-0">
                                <img
                                  src="https://img.b112j.com/images/web/flag/BD.png"
                                  alt=""
                                />
                                <span>{phoneValue?.slice(0, 4) || "+880"}</span>
                              </li>
                            </div>
                          </div>
                          <PhoneInput
                            id="phoneNumber"
                            name="phoneNumber"
                            international
                            defaultCountry="BD"
                            value={phoneValue}
                            onChange={(value) => {
                              setPhoneValue(value);
                              setFormData((prev) => ({
                                ...prev,
                                phoneNumber: value || "",
                              }));

                              // Clear error on change
                              if (errors["phoneNumber"]) {
                                setErrors((prev) => ({
                                  ...prev,
                                  phoneNumber: "",
                                }));
                              }
                            }}
                            className="custom-phone-input"
                            placeholder="Enter phone number"
                          />
                        </div>
                        {getFieldError("phoneNumber") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("phoneNumber")}
                          </div>
                        )}
                      </li>
                      <li>
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your valid email address"
                          style={{
                            borderColor: isFieldValid("email")
                              ? undefined
                              : "#ff0000",
                          }}
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {getFieldError("email") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("email")}
                          </div>
                        )}
                      </li>
                      <li>
                        <label htmlFor="username">Username</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          placeholder="Enter 4-15 characters (numbers allowed)"
                          style={{
                            textTransform: "lowercase",
                            borderColor: isFieldValid("username")
                              ? undefined
                              : "#ff0000",
                          }}
                          required
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                        {getFieldError("username") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("username")}
                          </div>
                        )}
                      </li>
                      <li>
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="Enter 6-20 characters (numbers allowed)"
                          style={{
                            borderColor: isFieldValid("password")
                              ? undefined
                              : "#ff0000",
                          }}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        {getFieldError("password") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("password")}
                          </div>
                        )}
                      </li>
                      <li>
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="Confirm password"
                          style={{
                            borderColor: isFieldValid("confirmPassword")
                              ? undefined
                              : "#ff0000",
                          }}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {getFieldError("confirmPassword") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("confirmPassword")}
                          </div>
                        )}
                      </li>
                      <li>
                        <label htmlFor="currencyType">
                          Select Your Currency
                        </label>
                        <select
                          id="currencyType"
                          name="currencyType"
                          value={formData.currencyType}
                          onChange={handleInputChange}
                          style={{
                            borderColor: isFieldValid("currencyType")
                              ? undefined
                              : "#ff0000",
                          }}
                        >
                          <option value="1">BDT</option>
                          <option value="7">INR</option>
                          <option value="24">NPR</option>
                          <option value="17">PKR</option>
                        </select>
                        {getFieldError("currencyType") && (
                          <div
                            className="field-error"
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "5px",
                            }}
                          >
                            {getFieldError("currencyType")}
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                )}

                <div id="register-form-step2" className="form-inner v2_step2">
                  <div className="form-btn-box">
                    <button
                      type="submit"
                      id="registerButton"
                      className="btn-register-submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Signup now"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="right-register-banner">
            <div key={bannerImages[0].id} className="banner-slide">
              <img
                src={bannerImages[0].image}
                alt={bannerImages[0].title}
                className="h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
