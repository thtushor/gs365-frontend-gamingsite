/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { useRegister } from "../lib/api/hooks";
import {
  validateRegistrationForm,
  transformRegistrationData,
} from "../lib/utils/validation";
import "./Register.scss";
import "react-toastify/dist/ReactToastify.css";
import { showToaster } from "../lib/utils/toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import signup1 from "../assets/signup1.jpg";
import signup2 from "../assets/signup2.jpg";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import { PasswordInputBox } from "../components/Shared/PasswordInputBox";

const Register = () => {
  const { user, selectedCurrency } = useAuth();
  console.log(selectedCurrency);
  const getRequest = useGetRequest();

  const navigate = useNavigate();

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
      flagUrl: `data:image/png;base64,${country.flagUrl}`,
      currency: {
        id: country.currency?.id,
        value: country.currency?.id,
        label: `${country.currency?.name} (${country.currency.code})`,
      },
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

  const [searchParams] = useSearchParams();
  const refCodeParam =
    searchParams.get("refCode") || searchParams.get("refcode") || "";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    friendReferCode: "",
    realName: "",
    currencyType: defaultCountry?.currency?.id || "",
    callingCode: defaultCountry?.phoneCode || "+880",
    phoneNumber: "",
    email: "",
    ageCheck: false,
    refCode: refCodeParam || "",
  });

  const [form, setForm] = useState({
    country: defaultCountry?.value || "",
    currency: defaultCountry?.currency?.id || "",
    phoneCode: defaultCountry?.phoneCode || "",
    countryId: defaultCountry?.id,
  });

  const [phoneValue, setPhoneValue] = useState(formData.phoneNumber || "");
  const [errors, setErrors] = useState({});
  const registerMutation = useRegister();

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

  const currencyOptions = countryData?.data?.map((country) => ({
    id: country.currency?.id,
    value: country.currency?.id,
    label: `${country.currency?.name} (${country.currency.code})`,
    // flagUrl: `data:image/png;base64,${country.flagUrl}`,
  }));

  // console.log({countryData})

  // const currencyOptions =
  //   countryOptions.map((c) => ({
  //     value: c.currency?.id,
  //     label: `${c.currency?.name} (${c.currency?.code})`,
  //   })) || [];

  console.log({});

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const bannerImages = [
    { id: 1, image: signup1 },
    { id: 2, image: signup2 },
  ];

  useEffect(() => {
    if (selectedCurrency) {
      setFormData((prev) => ({
        ...prev,
        country: {
          id: selectedCurrency.country?.id,
          value: selectedCurrency?.country?.code,
          flagUrl: `data:image/png;base64,${selectedCurrency?.country?.flagUrl}`,
          currency: {
            id: selectedCurrency?.country.currency?.id,
            value: selectedCurrency?.country.currency?.id,
            label: `${selectedCurrency?.country.currency?.name} (${selectedCurrency?.country.currency.code})`,
          },
        },
        currency: {
          id: selectedCurrency?.country.currency?.id,
          value: selectedCurrency?.country.currency?.id,
          label: `${selectedCurrency?.country.currency?.name} (${selectedCurrency?.country.currency.code})`,
        },
      }));
    }
  }, [selectedCurrency]);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRegistrationForm(formData);
    console.log({ validation });
    if (!validation.isValid) {
      const errorMap = {};
      validation.errors.forEach((error) => {
        if (error.field !== "countryId") {
          errorMap[error.field] = error.message;
        }
      });
      setErrors(errorMap);
      return;
    }

    setErrors({});

    try {
      const apiData = {
        username: formData.username.trim().toLowerCase(),
        fullname: formData.realName.trim(),
        phone: formData.phoneNumber,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        currency_id: formData?.currency?.value,
        refer_code:
          formData.friendReferCode?.trim() ||
          formData.refCode?.trim() ||
          undefined,
        isAgreeWithTerms: formData.ageCheck,
        country_id: formData.country?.id,
      };

      // return console.log(apiData);

      const response = await registerMutation.mutateAsync(apiData);
      console.log("Registration successful:", response.data);
      // showToaster(
      //   "Registration successful! Welcome to GameStar365!",
      //   "success"
      // );
      navigate("/");
    } catch (error) {
      // console.log({error})
      // console.error("Registration failed:", error);
      return showToaster(
        error?.message || "Registration failed. Please try again.",
        "error"
      );

      // Grab message from backend if available
      const errorMessage =
        error?.response?.data?.message ||
        (error?.message
          ? error.message
          : "Registration failed. Please try again.");

      toast.error(errorMessage, "error");

      // Handle field-level validation errors
      if (error?.response?.data?.errors) {
        const serverErrors = {};
        Object.entries(error.response.data.errors).forEach(
          ([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              serverErrors[field] = messages[0];
            }
          }
        );
        setErrors(serverErrors);
      } else {
        setErrors({ general: errorMessage });
      }
    }
  };

  const getFieldError = (fieldName) => errors[fieldName] || "";
  const isFieldValid = (fieldName) => !errors[fieldName];

  // console.log({ formData })

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="register-page">
      <div className="register-wrap">
        <div className="register-notice">
          If you face any issues, contact{" "}
          <a
            style={{ color: "red" }}
            className="intercom_custom_launcher"
            onClick={() => void 0}
          >
            Online Customer Service
          </a>
        </div>

        {errors.general && (
          <div
            className="error-message"
            style={{ color: "#ff0000", margin: "10px 0", textAlign: "center" }}
          >
            {errors.general}
          </div>
        )}

        <div className="register-content">
          <div className="left-register-info">
            <ul className="register-tab register-tab-one">
              <li className="active">
                <a href="javascript:void(0);">Sign Up</a>
              </li>
            </ul>

            <div className="general-register text-left">
              <form onSubmit={handleFormSubmit}>
                <ul>
                  <li>
                    <label htmlFor="refCode">Referral Code</label>
                    <input
                      id="refCode"
                      name="refCode"
                      type="text"
                      value={formData.refCode}
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
                        className="text-[#ff0000] text-base mt-1"
                        style={{ color: "#ff0000", fontSize: "12px" }}
                      >
                        {getFieldError("refCode")}
                      </div>
                    )}
                  </li>

                  <li>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="4-15 characters"
                      style={{
                        textTransform: "lowercase",
                        borderColor: isFieldValid("username")
                          ? undefined
                          : "#ff0000",
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
                    <PasswordInputBox
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="6-20 characters"
                      minLength={6}
                      maxLength={20}
                      // error={}
                    />

                    {getFieldError("password") && (
                      <div className="text-[#ff0000] text-base mt-1">
                        {getFieldError("password")}
                      </div>
                    )}
                  </li>

                  <li>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <PasswordInputBox
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="6-20 characters"
                      minLength={6}
                      maxLength={20}
                      // error={getFieldError("confirmPassword")}
                    />
                    {getFieldError("confirmPassword") && (
                      <div className="text-[#ff0000] text-base mt-1">
                        {getFieldError("confirmPassword")}
                      </div>
                    )}
                  </li>

                  {/* COUNTRY */}
                  <div className="register-select">
                    <label
                      htmlFor="country"
                      className="text-white font-medium mb-1 block"
                    >
                      Country
                    </label>
                    {countryLoading ? (
                      <p className="text-gray-500 text-sm">
                        Loading countries...
                      </p>
                    ) : (
                      <Select
                        options={countryOptions}
                        name="country"
                        // defaultValue={selectedCurrency?.country?.id}
                        value={
                          formData.country || {
                            id: selectedCurrency.country.id,
                            value: selectedCurrency?.country?.code,
                            flagUrl: `data:image/png;base64,${selectedCurrency?.country?.flagUrl}`,
                            currency: {
                              id: selectedCurrency?.country.currency?.id,
                              value: selectedCurrency?.country.currency?.id,
                              label: `${selectedCurrency?.country.currency?.name} (${selectedCurrency?.country.currency.code})`,
                            },
                          }
                        }
                        // inputValue={formData.country||{name: selectedCurrency?.country.name, id: selectedCurrency?.country?.id}}
                        onChange={(selected) => {
                          // console.log({ selected, selectedCurrency, formData })
                          handleInputChange({
                            target: {
                              name: "country",
                              value: selected,
                            },
                          });

                          setFormData((prev) => ({
                            ...prev,
                            currency: selected.currency,
                          }));
                        }}
                        isSearchable
                        placeholder="Select Country"
                        styles={{
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "300px",
                            overflowY: "auto",
                            background: "rgb(255 255 255 / 61%)",
                            color: "#1a1a1a",
                          }),
                          input: (base) => ({ ...base, color: "#fff" }),
                        }}
                        getOptionLabel={(option) => (
                          <div className="flex items-center gap-2">
                            <img
                              src={option.flagUrl}
                              alt=""
                              width={20}
                              height={14}
                              style={{ borderRadius: "2px" }}
                            />
                            {option.label}
                          </div>
                        )}
                        getOptionValue={(option) => option.value}
                      />
                    )}

                    {getFieldError("country") && (
                      <div
                        className="text-[#ff0000] text-base mt-1"
                        // style={{ color: "#ff0000", fontSize: "12px" }}
                      >
                        {getFieldError("country")}
                      </div>
                    )}
                  </div>

                  {/* CURRENCY */}
                  <div className="mt-3 register-select">
                    <label
                      htmlFor="currency"
                      className="text-white font-medium mb-1 block"
                    >
                      Currency
                    </label>
                    <Select
                      options={currencyOptions}
                      name="currency"
                      value={
                        formData.currency || {
                          id: selectedCurrency?.country.currency?.id,
                          value: selectedCurrency?.country.currency?.id,
                          label: `${selectedCurrency?.country.currency?.name} (${selectedCurrency?.country.currency.code})`,
                        }
                      }
                      onChange={(selected) =>
                        handleInputChange({
                          target: {
                            value: selected,
                            name: "currency",
                          },
                        })
                      }
                      isSearchable
                      placeholder="Select Currency"
                      styles={{
                        menuList: (base) => ({
                          ...base,
                          maxHeight: "300px",
                          overflowY: "auto",
                          background: "rgb(255 255 255 / 61%)",
                          color: "#1a1a1a",
                        }),
                        input: (base) => ({ ...base, color: "#fff" }),
                      }}
                    />

                    {getFieldError("currency") && (
                      <div
                        className="text-[#ff0000] text-base mt-1"
                        // style={{ color: "#ff0000", fontSize: "12px" }}
                      >
                        {getFieldError("currency")}
                      </div>
                    )}
                  </div>

                  <li className="mt-3">
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
                      // required
                      value={formData.realName}
                      onChange={handleInputChange}
                    />
                    {getFieldError("realName") && (
                      <div
                        className="text-[#ff0000] text-base mt-1"
                        // style={{ color: "#ff0000", fontSize: "12px" }}
                      >
                        {getFieldError("realName")}
                      </div>
                    )}
                  </li>

                  <li>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <PhoneInput
                      id="phoneNumber"
                      name="phoneNumber"
                      international
                      defaultCountry={formData?.country?.value || "BD"}
                      disableCountryCode={true}
                      countryCodeEditable={false}
                      disableDropdown={true}
                      value={phoneValue}
                      onChange={(value) => {
                        handleInputChange({
                          target: { name: "phoneNumber", value: value || "" },
                        });
                      }}
                      placeholder="Enter phone number"
                    />
                    {getFieldError("phoneNumber") && (
                      <div className="text-[#ff0000] text-base mt-1">
                        {getFieldError("phoneNumber")}
                      </div>
                    )}
                  </li>

                  <li>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter a valid email"
                      style={{
                        borderColor: isFieldValid("email")
                          ? undefined
                          : "#ff0000",
                      }}
                      // required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {getFieldError("email") && (
                      <div
                        className="text-[#ff0000] text-base mt-1"
                        // style={{ color: "#ff0000", fontSize: "12px" }}
                      >
                        {getFieldError("email")}
                      </div>
                    )}
                  </li>

                  <li className="check-wrap !items-start">
                    <input
                      type="checkbox"
                      id="ageCheck"
                      name="ageCheck"
                      checked={formData.ageCheck}
                      onChange={handleInputChange}
                      required
                    />
                    <div htmlFor="ageCheck" className="mt-[-2px]">
                      <span className="check-cube"></span>
                      <p className="!text-[12px] md:!text-[14px]">
                        I confirm that I am 18 years of age or older and agree
                        to the Terms & Conditions. If USD is selected as the
                        currency, you must complete OTP verification through
                        your registered email address. Deposits will only be
                        accepted through international payment methods such as
                        VISA, MasterCard, Google Pay, and similar services.
                        Withdrawals, however, will be available exclusively via
                        cryptocurrency, specifically Tether (USDT).
                      </p>
                    </div>
                    {getFieldError("ageCheck") && (
                      <div
                        className="text-[#ff0000] text-base mt-1"
                        // style={{ color: "#ff0000", fontSize: "12px" }}
                      >
                        {getFieldError("ageCheck")}
                      </div>
                    )}
                  </li>
                </ul>

                <div className="form-btn-box">
                  <button
                    type="submit"
                    id="registerButton"
                    className="btn-register-submit"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="right-register-banner mt-[66px]">
            <Slider {...sliderSettings}>
              {bannerImages.map((banner) => (
                <div key={banner.id} className="banner-slide">
                  <img src={banner.image} alt="banner" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
