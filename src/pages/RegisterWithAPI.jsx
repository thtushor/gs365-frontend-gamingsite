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
import BaseModal from "../components/Promotion/BaseModal";
import ToastSuccess from "../lib/ToastSuccess";
import VerifyOtpPopup from "../components/Auth/VerifyOtpPopup";
import AuthInput from "../components/Auth/AuthInput";
import { UserIcon } from "../components/Icon/UserIcon";
import { LockIcon } from "../components/Icon/LockIcon";
import { EmailIcon } from "../components/Icon/EmailIcon";

const Register = () => {
  const { user, selectedCurrency } = useAuth();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
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

      // Store email and show OTP verification popup
      setRegisteredEmail(formData.email.trim().toLowerCase());
      setShowVerifyOtp(true);
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
        <div className="header-auth  mb-5">
          <p className="signup-btn-green w-full !py-2 pointer-events-none select-none !text-base !font-semibold !capitalize">
            Register as a{" "}
            <span className="bg-black text-[#00ff99] px-2 rounded-full">
              Player
            </span>{" "}
            with just one click and instantly unlock a world of exciting games.
          </p>
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
            <div className="general-register text-left">
              <form onSubmit={handleFormSubmit}>
                <ul>
                  <AuthInput
                    as="li"
                    label="Refer Code"
                    id="friendReferCode"
                    name="friendReferCode"
                    type="text"
                    placeholder="Refer code"
                    value={formData.friendReferCode}
                    onChange={handleInputChange}
                    error={getFieldError("friendReferCode")}
                  />

                  <AuthInput
                    as="li"
                    label="Username"
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
                    value={formData.username}
                    onChange={handleInputChange}
                    icon={<UserIcon color="#ffd700" />}
                    error={getFieldError("username")}
                    required
                  />

                  <AuthInput
                    as="li"
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="6-20 characters"
                    minLength={6}
                    maxLength={20}
                    icon={<LockIcon color="#ffd700" />}
                    error={getFieldError("password")}
                    required
                  />

                  <AuthInput
                    as="li"
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="6-20 characters"
                    minLength={6}
                    maxLength={20}
                    icon={<LockIcon color="#ffd700" />}
                    error={getFieldError("confirmPassword")}
                    required
                  />

                  {/* COUNTRY */}
                  <AuthInput
                    as="li"
                    label="Select Country"
                    error={getFieldError("country")}
                  >
                    <Select
                      className="register-select w-full"
                      options={countryOptions}
                      defaultValue={defaultCountry}
                      onChange={(option) => {
                        setForm((prev) => ({
                          ...prev,
                          country: option.value,
                          currency: option.currency.id,
                          phoneCode: option.phoneCode,
                          countryId: option.id,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          currencyType: option.currency.id,
                          callingCode: option.phoneCode,
                        }));
                      }}
                      formatOptionLabel={(country) => (
                        <div className="flex items-center gap-2">
                          <img
                            src={country.flagUrl}
                            alt=""
                            className="w-5 h-4 object-cover"
                          />
                          <span>{country.label}</span>
                        </div>
                      )}
                    />
                  </AuthInput>

                  <AuthInput
                    as="li"
                    label="Currency"
                    error={getFieldError("currency")}
                  >
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
                  </AuthInput>

                  <AuthInput
                    as="li"
                    label="Full Name"
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
                    value={formData.realName}
                    onChange={handleInputChange}
                    icon={<UserIcon color="#ffd700" />}
                    error={getFieldError("realName")}
                    required
                  />

                  <AuthInput
                    as="li"
                    label="Phone Number"
                    error={getFieldError("phoneNumber")}
                  >
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
                          setErrors((prev) => ({
                            ...prev,
                            phoneNumber: "",
                          }));
                        }
                      }}
                      className="custom-phone-input w-full"
                      placeholder="Enter phone number"
                    />
                  </AuthInput>

                  <AuthInput
                    as="li"
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter a valid email"
                    style={{
                      borderColor: isFieldValid("email")
                        ? undefined
                        : "#ff0000",
                    }}
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<EmailIcon color="#ffd700" />}
                    error={getFieldError("email")}
                    required
                  />

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

          <div className="right-register-banner ">
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

      {/* OTP Verification Popup */}
      <VerifyOtpPopup
        isOpen={showVerifyOtp}
        onClose={() => setShowVerifyOtp(false)}
        email={registeredEmail}
        onVerified={() => {
          setShowVerifyOtp(false);
          setSuccessModalOpen(true);
        }}
      />

      {/* Success Modal - shown after OTP verification */}
      <BaseModal
        open={successModalOpen}
        showClose={false}
        onClose={() => setSuccessModalOpen(false)}
      >
        <ToastSuccess
          title="Email Verified!"
          description="Welcome to GS365! Your journey starts now, get ready to play and win big."
          onClose={setSuccessModalOpen}
          location="/"
        />
      </BaseModal>
    </div>
  );
};

export default Register;
