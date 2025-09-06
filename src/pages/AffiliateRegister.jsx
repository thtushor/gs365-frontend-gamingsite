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
import { useAuth } from "../contexts/auth-context";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useGetRequest } from "../lib/api/apiClient";
import { toast } from "react-toastify";

const AffiliateRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refCodeParam =
    searchParams.get("refCode") || searchParams.get("refcode");
  const { selectedCurrency } = useAuth();
  const getRequest = useGetRequest();

  // Fetch country list
  const { data: countryData, isLoading: countryLoading } = useQuery({
    queryKey: ["country", { status: "active" }],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_COUNTRIES,
        errorMessage: "Failed to fetch countries",
        isPublic: true,
        params: { status: "active" },
      }),
  });

  // Prepare country options
  const countryOptions =
    countryData?.data?.map((country) => ({
      id: country.id,
      value: country.code,
      label: country.name,
      currency: {
        id: country.currency?.id,
        code: country.currency?.code,
        name: country.currency?.name,
      },
      phoneCode: `+${country.callingCode || (country.code === "BD" ? "880" : "")
        }`,
      flagUrl: `data:image/png;base64,${country.flagUrl}`,
    })) || [];

  // Extract selectedCountry from selectedCurrency
  const selectedCountryFromCurrency = countryOptions.find(
    (c) => c.value === selectedCurrency?.country?.code
  );

  // Fallback: Bangladesh or first available country
  const defaultCountry =
    selectedCountryFromCurrency ||
    countryOptions.find((c) => c.value === "BD") ||
    countryOptions[0];

  const [form, setForm] = useState({
    country: defaultCountry?.value || "",
    currency: defaultCountry?.currency?.id || "",
    phoneCode: defaultCountry?.phoneCode || "",
    countryId: defaultCountry?.id,
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    friendReferCode: "",
    realName: "",
    email: "",
    captchaInput: "",
    ageCheck: true,
    currencyType: form.currency || "",
    callingCode: defaultCountry?.phoneCode || "+880",
    phoneNumber: "",
    role: refCodeParam ? "affiliate" : "superAffiliate",
    refCode: refCodeParam,
  });

  console.log(formData);
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState(formData.phoneNumber || "");

  // Update currency & phoneCode when country changes
  useEffect(() => {
    if (!countryLoading && countryOptions.length > 0) {
      const selected = countryOptions.find(
        (c) => c.value === selectedCurrency?.country?.code
      );

      if (selected) {
        setForm({
          country: selected.value,
          currency: selected.currency?.id || "",
          phoneCode: selected.phoneCode || "",
          countryId: selected.id,
        });

        setFormData((prev) => ({
          ...prev,
          currencyType: selected.currency?.id || "",
          callingCode: selected.phoneCode || "",
        }));
      }
    }
  }, [countryLoading, countryOptions?.length, selectedCurrency]);

  // Sync phoneValue with formData.phoneNumber
  useEffect(() => {
    if (phoneValue) {
      const fullNumber = phoneValue.startsWith("+")
        ? phoneValue
        : `${form.phoneCode}${phoneValue.replace(/^0+/, "")}`;
      setFormData((prev) => ({
        ...prev,
        phoneNumber: fullNumber,
      }));
    }
  }, [phoneValue, form.phoneCode]);

  const currencyOptions =
    countryOptions.map((c) => ({
      value: c.currency?.id,
      label: `${c.currency?.name} (${c.currency?.code})`,
    })) || [];

  const [currentStep] = useState(1);

  console.log({ refCodeParam });

  const [errors, setErrors] = useState({});

  const bannerImages = [
    {
      id: 1,
      image: signup3,
      title: "Welcome to Game Star 365",
      description: "Join our gaming community today!",
    },
  ];

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
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

  const validateStep = (step) => {
    const validation = validateRegistrationForm(formData);
    const stepErrors = {};

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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1)) {
      return;
    }
    if (!formData.refCode) {
      return toast.error("Please provide a referral code!");
    }

    // Validate entire form
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      const errorMap = {};
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
        country_id: form.countryId,
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
      // showToaster(
      //   "Registration successful! Welcome to GameStar365!",
      //   "success"
      // );

      // Redirect to home page or dashboard
      navigate("/");
    } catch (error) {
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
        typeof error.message === "string"
      ) {
        errorMessage = error.message;
      }
      showToaster(errorMessage, "error");
    }
  };

  const getFieldError = (fieldName) => {
    return errors[fieldName] || "";
  };

  const isFieldValid = (fieldName) => {
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
                            borderColor: isFieldValid("refCode") ? undefined : "#ff0000",
                          }}
                        />
                        {getFieldError("refCode") && (
                          <div className="text-[#ff0000] text-base mt-1">
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
                            borderColor: isFieldValid("realName") ? undefined : "#ff0000",
                          }}
                          // required
                          value={formData.realName}
                          onChange={handleInputChange}
                        />
                        {getFieldError("realName") && (
                          <div className="text-[#ff0000] text-base mt-1">
                            {getFieldError("realName")}
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
                            borderColor: isFieldValid("email") ? undefined : "#ff0000",
                          }}
                          // required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {getFieldError("email") && (
                          <div className="text-[#ff0000] text-base mt-1">
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
                            borderColor: isFieldValid("username") ? undefined : "#ff0000",
                          }}
                          // required
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                        {getFieldError("username") && (
                          <div className="text-[#ff0000] text-base mt-1">
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
                            borderColor: isFieldValid("password") ? undefined : "#ff0000",
                          }}
                          // required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        {getFieldError("password") && (
                          <div className="text-[#ff0000] text-base mt-1">
                            {getFieldError("password")}
                          </div>
                        )}
                      </li>

                      <li>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="Confirm password"
                          style={{
                            borderColor: isFieldValid("confirmPassword") ? undefined : "#ff0000",
                          }}
                          // required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {getFieldError("confirmPassword") && (
                          <div className="text-[#ff0000] text-base mt-1">
                            {getFieldError("confirmPassword")}
                          </div>
                        )}
                      </li>

                      <li>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <PhoneInput
                          id="phoneNumber"
                          name="phoneNumber"
                          international
                          defaultCountry="BD"
                          value={phoneValue}
                          disableDropdown={true}
                          disableCountryCode={true}
                          onChange={(value) => {
                            setPhoneValue(value);
                            setFormData((prev) => ({
                              ...prev,
                              phoneNumber: value || "",
                            }));
                            if (errors["phoneNumber"]) {
                              setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                            }
                          }}
                          className="custom-phone-input"
                          placeholder="Enter phone number"
                          style={{
                            borderColor: isFieldValid("phoneNumber") ? undefined : "#ff0000",
                          }}
                        />
                        {getFieldError("phoneNumber") && (
                          <div className="text-[#ff0000] text-base mt-1">
                            {getFieldError("phoneNumber")}
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

export default AffiliateRegister;
