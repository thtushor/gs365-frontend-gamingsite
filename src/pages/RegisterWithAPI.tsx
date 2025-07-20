/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRegister } from "../lib/api/hooks";
import {
  validateRegistrationForm,
  transformRegistrationData,
} from "../lib/utils/validation";
import "./Register.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToaster } from "../lib/utils/toast";
import { useSearchParams } from "react-router-dom";

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const refCodeParam = searchParams.get("refcode") || "";

  const [currentStep, setCurrentStep] = useState(1);
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
    ageCheck: false,
    refCode: refCodeParam,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // React Query hook for registration
  const registerMutation = useRegister();

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
    {
      id: 1,
      image:
        "https://www.shutterstock.com/image-vector/this-image-features-colorful-online-600nw-2467530093.jpg",
      title: "Welcome to GameStar365",
      description: "Join our gaming community today!",
    },
    {
      id: 2,
      image:
        "https://c8.alamy.com/comp/PHN4DX/casino-design-with-777-jackpot-and-money-coins-over-purple-background-colorful-design-vector-illustration-PHN4DX.jpg",
      title: "Exclusive Bonuses",
      description: "Get amazing welcome bonuses on registration",
    },
    {
      id: 3,
      image:
        "https://c8.alamy.com/comp/2EM4KEP/poker-cards-casino-gambling-games-vector-design-playing-cards-and-casino-chips-with-golden-ribbon-banner-sparkles-and-poker-hand-four-rockets-with-2EM4KEP.jpg",
      title: "24/7 Support",
      description: "Our customer service team is always ready to help",
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
          ["username", "password", "confirmPassword", "currencyType"].includes(
            error.field
          )
        ) {
          stepErrors[error.field] = error.message;
        }
      });
    } else if (step === 2) {
      // Validate step 2 fields
      validation.errors.forEach((error) => {
        if (
          ["realName", "phoneNumber", "email", "ageCheck"].includes(error.field)
        ) {
          stepErrors[error.field] = error.message;
        }
      });
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
    // Clear step 2 errors when going back
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.realName;
      delete newErrors.phoneNumber;
      delete newErrors.email;
      delete newErrors.ageCheck;
      return newErrors;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      // Transform form data to API format
      const apiData = {
        ...transformRegistrationData(formData),
        refer_code: formData.refCode,
      };

      // Call registration API
      const response = await registerMutation.mutateAsync(apiData);

      // Success - user will be automatically logged in and redirected
      console.log("Registration successful:", response.data);

      // Show beautiful toast notification
      showToaster(
        "Registration successful! Welcome to GameStar365!",
        "success"
      );

      // Redirect to home page or dashboard
      window.location.href = "/";
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string"
          ? (error as any).message
          : "Registration failed. Please try again.";
      showToaster(errorMessage, "error");

      // Handle API errors
      if (error && typeof error === "object" && "errors" in error) {
        // Server validation errors
        const serverErrors: Record<string, string> = {};
        Object.entries(
          (error as { errors: Record<string, string[]> }).errors
        ).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            serverErrors[field] = messages[0];
          }
        });
        setErrors(serverErrors);
      } else {
        // General error
        setErrors({
          general:
            (error as Error)?.message ||
            "Registration failed. Please try again.",
        });
      }
    }
  };

  const getFieldError = (fieldName: string): string => {
    return errors[fieldName] || "";
  };

  const isFieldValid = (fieldName: string): boolean => {
    return !errors[fieldName];
  };

  return (
    <div className="register-page">
      <div className="register-wrap">
        <div className="register-notice">
          আপনার যদি সমস্যা হয় তবে যোগাযোগ করুন
          <a
            style={{ color: "red" }}
            className="intercom_custom_launcher"
            onClick={() => void 0}
          >
            অনলাইন কাস্টমার সার্ভিস
          </a>
        </div>

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
            <ul className="register-tab register-tab-one">
              <li className="active">
                <a href="javascript:void(0);">সাইন আপ</a>
              </li>
            </ul>
            <div className="general-register step-register">
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
                        <label htmlFor="username">ব্যবহারকারীর নাম</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          placeholder="৪-১৫ অক্ষর	 নাম্বার এলাউ"
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
                        <label htmlFor="password">পাসওয়ার্ড</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="৬-২০ অক্ষর	 নাম্বার এলাউ"
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
                          পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="পাসওয়ার্ড নিশ্চিত করুন"
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
                          কারেন্সি নির্বাচন করুন
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
                          <option value="8">BDT</option>
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
                    <div className="form-btn-box">
                      <button
                        type="button"
                        className="btn-register-next"
                        onClick={nextStep}
                        disabled={registerMutation.isPending}
                      >
                        পরবর্তী
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div id="register-form-step2" className="form-inner v2_step2">
                    <ul>
                      <li>
                        <label htmlFor="realName">সম্পূর্ণ নাম</label>
                        <input
                          id="realName"
                          type="text"
                          name="realName"
                          placeholder="সম্পূর্ণ নাম লিখুন"
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
                            উইথড্র এর সময় আইডেন্টিটি ভেরিফিকেশন এর জন্য অনুগ্রহ
                            করে আপনার সম্পূর্ণ সঠিক নাম লিখুন।
                          </p>
                        </div>
                      </li>
                      <li>
                        <label htmlFor="phoneNumber">ফোন নাম্বার</label>
                        <div className="phone-info">
                          <div className="phone-area-code">
                            <div className="lang-select">
                              <button
                                type="button"
                                className="btn-select"
                                value="en"
                              >
                                <li>
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
                            placeholder="দয়া করে ফোন নম্বর লিখুন"
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
                      </li>
                      <li>
                        <label htmlFor="email">ই-মেইল</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="একটি বৈধ ইমেল লিখুন"
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
                    </ul>

                    <div className="check-wrap">
                      <input
                        type="checkbox"
                        id="ageCheck"
                        name="ageCheck"
                        checked={formData.ageCheck}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="ageCheck">
                        <span className="check-cube"></span>
                        <p>আমি 18 বছর বয়সী এবং শর্তাদি শর্তে সম্মত।</p>
                      </label>
                    </div>
                    {getFieldError("ageCheck") && (
                      <div
                        className="field-error"
                        style={{
                          color: "#ff0000",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        {getFieldError("ageCheck")}
                      </div>
                    )}

                    <div className="form-btn-box">
                      <button
                        type="button"
                        id="goToStep1"
                        className="btn-register-prev"
                        onClick={prevStep}
                        disabled={registerMutation.isPending}
                      >
                        আগে
                      </button>
                      <button
                        type="submit"
                        id="registerButton"
                        className="btn-register-submit"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending
                          ? "রেজিস্টার হচ্ছে..."
                          : "রেজিস্টার করুন"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="right-register-banner">
            <Slider {...sliderSettings}>
              {bannerImages.map((banner) => (
                <div key={banner.id} className="banner-slide">
                  <img src={banner.image} alt={banner.title} />
                  <div className="banner-content">
                    <h3>{banner.title}</h3>
                    <p>{banner.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
