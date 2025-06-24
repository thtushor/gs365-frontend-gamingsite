import React, { useState } from "react";
import "./LoginPopup.scss";
import { useLogin } from "../../lib/api/hooks";
import { showToaster } from "../../lib/utils/toast";

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
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [forgetPasswordTab, setForgetPasswordTab] = useState("email"); // 'email' or 'sms'
  const [formData, setFormData] = useState({
    userNameOrEmailorPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // React Query hook for login
  const loginMutation = useLogin();

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
    setShowForgetPassword(true);
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
      await loginMutation.mutateAsync({
        userNameOrEmailorPhone: formData.userNameOrEmailorPhone,
        password: formData.password,
      });

      // Success
      showToaster("Login successful! Welcome back!", "success");
      setFormData({
        userNameOrEmailorPhone: "",
        password: "",
      });

      // Dispatch custom event to notify other components about login
      window.dispatchEvent(new Event("userLogin"));

      onClose(); // Close popup after successful login

      // Optionally redirect or update app state
      // window.location.href = "/";
    } catch (error: unknown) {
      console.error("Login failed:", error);

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
        const errorMessage =
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message: string }).message === "string"
            ? (error as { message: string }).message
            : "Login failed. Please check your credentials and try again.";
        showToaster(errorMessage, "error");
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
        className={`pop-wrap login ${
          showForgetPassword ? "forget-password-active" : ""
        }`}
      >
        <div className="pop-title">
          <h3>GameStar365 এ আপনাকে স্বাগতম</h3> {/* Replaced Baji */}
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="pop-inner">
          <div
            className="input-slides"
            style={{ height: showForgetPassword ? "auto" : "301px" }}
          >
            {/* Login Form Section */}
            {!showForgetPassword && (
              <div className="input-login">
                <form onSubmit={handleLoginSubmit}>
                  {/* Error section - can be controlled by state later */}
                  {/* <div className="error"><i className="icon-error"></i></div> */}
                  <ul className="input-group">
                    <li>
                      <label>ব্যবহারকারীর নাম</label>
                      <div className="input-icon-type">
                        {/* Placeholder for user icon */}
                        <i className="icon-user"></i>
                        <input
                          type="text"
                          id="loginUsername"
                          name="userNameOrEmailorPhone"
                          placeholder="ব্যবহারকারীর নাম"
                          value={formData.userNameOrEmailorPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {getFieldError("userNameOrEmailorPhone") && (
                        <div className="error-message">
                          {getFieldError("userNameOrEmailorPhone")}
                        </div>
                      )}
                    </li>
                    <li>
                      <label>পাসওয়ার্ড</label>
                      <div className="input-icon-type">
                        {/* Placeholder for password icon */}
                        <i className="icon-password"></i>
                        {/* Placeholder for eye icon */}
                        <div className="eyes"></div>
                        <input
                          id="loginPassword"
                          name="password"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="পাসওয়ার্ড"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {getFieldError("password") && (
                        <div className="error-message">
                          {getFieldError("password")}
                        </div>
                      )}
                    </li>
                  </ul>

                  <a
                    id="link_forget"
                    className="link forget"
                    href="#"
                    onClick={handleForgetPasswordClick}
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>

                  <button
                    id="loginButton"
                    className="btn-default-xs"
                    type="submit"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending
                      ? "লগইন হচ্ছে..."
                      : "এখনি লগইন করুন"}
                  </button>

                  <p>
                    একাউন্ট নেই?
                    <a
                      className="link"
                      href="#"
                      onClick={handleSignUpLinkClick}
                    >
                      এখন সাইন আপ করুন!
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
                    className={`tab-pane ${
                      forgetPasswordTab === "email" ? "active" : ""
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
                        <li>
                          <label htmlFor="userId_reset">ব্যবহারকারীর নাম</label>
                          <div className="input-icon-type">
                            {/* Placeholder for user icon */}
                            <i className="icon-user"></i>
                            <input
                              type="text"
                              id="userId_reset"
                              name="userId_reset"
                              placeholder="ব্যবহারকারীর নাম"
                              required
                            />
                          </div>
                        </li>
                        <li>
                          <label htmlFor="email_reset">
                            দয়াকরে ইমেল ইনপুট করুন
                          </label>
                          <div className="input-icon-type">
                            {/* Placeholder for mail icon */}
                            <i className="icon-mail"></i>
                            <input
                              type="email"
                              id="email_reset"
                              name="email_reset"
                              placeholder="দয়াকরে ইমেল ইনপুট করুন"
                              required
                            />
                          </div>
                        </li>
                      </ul>
                    </form>
                  </section>

                  {/* SMS Tab */}
                  <section
                    className={`tab-pane ${
                      forgetPasswordTab === "sms" ? "active" : ""
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
                        <li>
                          <label htmlFor="userIdSms_reset">
                            ব্যবহারকারীর নাম
                          </label>
                          <div className="input-icon-type">
                            {/* Placeholder for user icon */}
                            <i className="icon-user"></i>
                            <input
                              type="text"
                              id="userIdSms_reset"
                              name="userIdSms_reset"
                              placeholder="ব্যবহারকারীর নাম"
                              required
                            />
                          </div>
                        </li>
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
    </div>
  );
};

export default LoginPopup;
