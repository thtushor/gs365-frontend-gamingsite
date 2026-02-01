import React, { useState } from "react";
import "./LoginPopup.scss";

import { showToaster } from "../../lib/utils/toast";
import { useAuth } from "../../contexts/auth-context";

import BaseModal from "../Promotion/BaseModal";
import ToastSuccess from "../../lib/ToastSuccess";
import ToastError from "../../lib/ToastError";
import VerifyOtpPopup from "./VerifyOtpPopup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import AuthInput from "./AuthInput";
import { UserIcon } from "../Icon/UserIcon";
import { LockIcon } from "../Icon/LockIcon";



interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onSignUpClick,
}) => {
  const { login, isPendingLogin } = useAuth();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>("Login failed");
  const [errorDescription, setErrorDescription] = useState<string>(
    "Please check your credentials and try again.",
  );
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [forgetPasswordTab, setForgetPasswordTab] = useState("email"); // 'email' or 'sms'
  const [formData, setFormData] = useState({
    userNameOrEmailorPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // React Query hook for login

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleForgetPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPasswordPopup(true);
  };

  const handleBackToLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgetPassword(false);
  };

  const handleSignUpLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose(); // Close popup before navigating
    onSignUpClick(); // Handle navigation to signup page/modal
  };

  const handleTabClick = (tab: "email" | "sms") => {
    setForgetPasswordTab(tab);
  };

  // Login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.userNameOrEmailorPhone.trim()) {
      newErrors.userNameOrEmailorPhone =
        "Username, email, or phone is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      // Call login API
      await login({
        userNameOrEmailorPhone: formData.userNameOrEmailorPhone.trim(),
        password: formData.password.trim(),
      });

      // Success
      // showToaster("Login successful! Welcome back!", "success");
      setFormData({
        userNameOrEmailorPhone: "",
        password: "",
      });

      // navigate("/");

      // Dispatch custom event to notify other components about login
      window.dispatchEvent(new Event("userLogin"));

      // onClose(); // Close popup after successful login
      window.location.reload();
      // setSuccessModalOpen(true);
      onClose();
      // Optionally redirect or update app state
    } catch (error: unknown) {
      console.error("Login failed:", error);

      // Handle API errors
      if (error && typeof error === "object") {
        const err = error as any;
        const responseData = err.data || err.response?.data; // Interceptor puts backend response in err.data

        // Check for verification requirement
        if (responseData?.requiresVerification) {
          setVerificationEmail(responseData.email || formData.userNameOrEmailorPhone);
          // Show toaster with the message from backend (which indicates if new OTP was sent)
          showToaster(responseData.message || "Please verify your email.", "error");
          setShowVerifyOtp(true);
          return;
        }

        // Also check legacy/direct property just in case
        if (err.requiresVerification) {
          setVerificationEmail(err.email || formData.userNameOrEmailorPhone);
          setShowVerifyOtp(true);
          return;
        }

        if (responseData?.errors) {
          // Server validation errors
          const serverErrors: Record<string, string> = {};
          Object.entries(
            responseData.errors as Record<string, string[]>
          ).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              serverErrors[field] = messages[0];
            }
          });
          setErrors(serverErrors);
        } else {
          // General error -> show ToastError modal
          setErrorTitle("Login failed");
          setErrorDescription(
            responseData?.message || err.message || "Authentication was unsuccessful, please review your credentials and attempt to sign in again.",
          );
          setErrorModalOpen(true);
        }
      } else {
        // Fallback for non-object errors
        setErrorTitle("Login failed");
        setErrorDescription(
          "An unexpected error occurred. Please try again."
        );
        setErrorModalOpen(true);
      }
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot password form submitted");
    // Add actual forgot password logic here
  };

  const getFieldError = (fieldName: string): string => {
    return errors[fieldName] || "";
  };

  return (
    <div className="login-pop-group" id="loginPopup">
      {/* Tips group - can be controlled by state later */}
      {/* <div className="tips-group tips-warning"><b></b></div> */}

      <div
        className={`pop-wrap login ${successModalOpen && "opacity-0"} ${showForgetPassword ? "forget-password-active" : ""
          }`}
      >
        <div className="pop-title px-[10px] md:px-[20px] py-[8px] md:py-[20px]">
          <h3 className="text-[16px] md:text-[20px]">
            Welcome To Game Star 365
          </h3>{" "}
          {/* Replaced Baji */}
          <div className="btn-close" onClick={onClose}></div>
        </div>
        <div className="pop-inner py-3 px-4 md:p-6">
          <div className="input-slides">
            {/* Login Form Section */}
            {!showForgetPassword && (
              <div className="input-login">
                <form onSubmit={handleLoginSubmit}>
                  {/* Error section - can be controlled by state later */}
                  {/* <div className="error"><i className="icon-error"></i></div> */}
                  <ul className="input-group md:mb-[24px] mb-2">
                    <AuthInput
                      as="li"
                      label="Username"
                      labelClassName="md:mb-2 text-left md:text-center"
                      wrapperClassName="md:mb-5 mb-2"
                      id="loginUsername"
                      name="userNameOrEmailorPhone"
                      placeholder="Username or email address"
                      value={formData.userNameOrEmailorPhone}
                      onChange={handleInputChange}
                      icon={<UserIcon color="#ffd700" />}
                      error={getFieldError("userNameOrEmailorPhone")}
                      required
                    />
                    <AuthInput
                      as="li"
                      label="Password"
                      labelClassName="md:mb-2 text-left md:text-center"
                      id="loginPassword"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      icon={<LockIcon color="#ffd700" />}
                      minLength={6}
                      maxLength={20}
                      error={getFieldError("password")}
                      required
                    />
                  </ul>

                  <a
                    id="link_forget"
                    className="link forget md:mb-6"
                    href="#"
                    onClick={handleForgetPasswordClick}
                  >
                    Forget password?
                  </a>

                  <button
                    id="loginButton"
                    className="btn-default-xs md:my-6 my-4 text-[14px] md:text-[16px] py-[10px] md:p-[14px]"
                    type="submit"
                    disabled={isPendingLogin}
                  >
                    {isPendingLogin ? "Signing..." : "Login"}
                  </button>

                  <p className="md:my-4">
                    Not registered?
                    <a
                      className="link"
                      href="#"
                      onClick={handleSignUpLinkClick}
                    >
                      Click to signup now!
                    </a>
                  </p>
                </form>
              </div>
            )}

            {/* Forget Password Section */}
            {showForgetPassword && (
              <div className="input-forget">
                <div className="tab-primary-box">
                  <ul>
                    <li
                      className={forgetPasswordTab === "email" ? "active" : ""}
                    >
                      <a href="#" onClick={() => handleTabClick("email")}>
                        Email
                      </a>
                    </li>
                    <li className={forgetPasswordTab === "sms" ? "active" : ""}>
                      <a href="#" onClick={() => handleTabClick("sms")}>
                        SMS
                      </a>
                    </li>
                  </ul>
                  {/* Slider tab - placeholder */}
                  <div
                    className="slider-tab"
                    style={{
                      width: forgetPasswordTab === "email" ? "150px" : "150px",
                      transform:
                        forgetPasswordTab === "sms"
                          ? "translateX(150px)"
                          : "translateX(0)",
                    }}
                  ></div>
                </div>
                <div className="main-tab-content">
                  {/* Email Tab */}
                  <section
                    className={`tab-pane ${forgetPasswordTab === "email" ? "active" : ""
                      }`}
                    id="forgetPasswordEmailSection"
                    style={{
                      display: forgetPasswordTab === "email" ? "block" : "none",
                    }}
                  >
                    <form onSubmit={handleForgotPasswordSubmit}>
                      {/* Error section - can be controlled by state later */}
                      {/* <div className="error"><i className="icon-error"></i></div> */}
                      <ul className="input-group">
                        <AuthInput
                          as="li"
                          label="ব্যবহারকারীর নাম"
                          type="text"
                          id="userId_reset"
                          name="userId_reset"
                          placeholder="ব্যবহারকারীর নাম"
                          iconClass="icon-user"
                          required
                        />
                        <AuthInput
                          as="li"
                          label="দয়াকরে ইমেল ইনপুট করুন"
                          type="email"
                          id="email_reset"
                          name="email_reset"
                          placeholder="দয়াকরে ইমেল ইনপুট করুন"
                          iconClass="icon-mail"
                          required
                        />
                      </ul>
                    </form>
                  </section>

                  {/* SMS Tab */}
                  <section
                    className={`tab-pane ${forgetPasswordTab === "sms" ? "active" : ""
                      }`}
                    id="forgetPasswordSmsSection"
                    style={{
                      display: forgetPasswordTab === "sms" ? "block" : "none",
                    }}
                  >
                    <form onSubmit={handleForgotPasswordSubmit}>
                      {/* Error section - can be controlled by state later */}
                      {/* <div className="error"><i className="icon-error"></i></div> */}
                      <ul className="input-group">
                        <AuthInput
                          as="li"
                          label="ব্যবহারকারীর নাম"
                          type="text"
                          id="userIdSms_reset"
                          name="userIdSms_reset"
                          placeholder="ব্যবহারকারীর নাম"
                          iconClass="icon-user"
                          required
                        />
                        <li>
                          <label htmlFor="phone_reset">ফোন</label>
                          <div className="phone-info">
                            {/* Simplified phone area code section */}
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
                                    <span>+880</span>
                                  </li>
                                </button>
                                {/* Dropdown list placeholder */}
                                {/* <div className="phone-code-list-group"><ul className="phone-code-list">...</ul></div>*/}
                              </div>
                            </div>
                            <input
                              id="callingCode"
                              name="callingCode"
                              type="hidden"
                              value="880"
                            />
                            <input
                              type="text"
                              name="phone_reset"
                              id="phone_reset"
                              placeholder="ফোন"
                              required
                            />
                          </div>

                          {/* Placeholder for Turnstile/Captcha */}
                          {/* <div id="forgot-password-turnstile">...</div> */}
                        </li>
                      </ul>
                    </form>
                  </section>
                </div>
                <a
                  id="link_login"
                  className="link forget"
                  href="#"
                  onClick={handleBackToLoginClick}
                >
                  বেক টু লগইন
                </a>
                <button
                  id="forgotPasswordButton"
                  className="btn-default-xs"
                  type="submit"
                  onClick={handleForgotPasswordSubmit}
                >
                  পাসওয়ার্ড রিসেট করুন
                </button>
                <p>
                  একাউন্ট নেই?
                  <a className="link" href="#" onClick={handleSignUpLinkClick}>
                    এখন সাইন আপ করুন!
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Placeholder for Fail/Lock Popups - can be implemented later */}
      {/* <div className="pop-wrap fail-pop" style={{display:'none'}}>...</div> */}
      {/* <div className="pop-wrap fail-pop login-lock-pop" style={{display:'none'}}>...</div> */}

      <BaseModal
        open={successModalOpen}
        showClose={false}
        onClose={() => setSuccessModalOpen(false)}
      >
        <ToastSuccess
          title="Login Successful!"
          description="You're now signed in. Place your bets and enjoy the game!"
          onClose={setSuccessModalOpen}
          location="/"
          extraFn={onClose}
        />
      </BaseModal>

      {/* Error Modal */}
      <BaseModal
        open={errorModalOpen}
        showClose={false}
        onClose={() => setErrorModalOpen(false)}
      >
        <ToastError
          title={errorTitle}
          description={errorDescription}
          onClose={setErrorModalOpen}
          isRedirect={false}
          location="/"
          extraFn={() => { }}
        />
      </BaseModal>

      {/* OTP Verification Popup */}
      <VerifyOtpPopup
        // isOpen={true}
        isOpen={showVerifyOtp}
        onClose={() => setShowVerifyOtp(false)}
        email={verificationEmail}
        onVerified={() => {
          setShowVerifyOtp(false);
        }}
      />

      {/* Forgot Password Popup */}
      <ForgotPasswordPopup
        isOpen={showForgotPasswordPopup}
        onClose={() => setShowForgotPasswordPopup(false)}
      />
    </div>
  );
};

export default LoginPopup;
