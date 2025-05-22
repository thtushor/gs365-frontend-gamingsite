import React, { useState } from "react";
import "./LoginPopup.scss";

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

  if (!isOpen) return null;

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

  // Placeholder function for form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted");
    // Add actual login logic here
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot password form submitted");
    // Add actual forgot password logic here
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
                          name="loginUsername"
                          placeholder="ব্যবহারকারীর নাম"
                          required
                        />
                      </div>
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
                          name="loginPassword"
                          type="password"
                          minLength={6}
                          maxLength={20}
                          placeholder="পাসওয়ার্ড"
                          required
                        />
                      </div>
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
                  >
                    এখনি লগইন করুন
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
                            দয়াকরে ইমেল ইনপুট করুন
                          </label>
                          <div className="input-icon-type">
                            {/* Placeholder for mail icon */}
                            <i className="icon-mail"></i>
                            <input
                              type="email"
                              id="email_reset"
                              name="email_reset"
                              placeholder="দয়াকরে ইমেল ইনপুট করুন"
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
