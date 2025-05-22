import React, { useState } from "react";
import "./Register.scss";

const Register: React.FC = () => {
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
  });

  // Updated handleInputChange to properly type the event
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
  };

  // Placeholder for handling form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add actual registration logic here
    // If successful, you might want to redirect or show a success message
  };

  const nextStep = () => {
    // Add validation for step 1 here before proceeding
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
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

        <div className="left-register-info">
          <ul className="register-tab register-tab-one">
            <li className="active">
              <a href="javascript:void(0);">সাইন আপ</a>
            </li>
          </ul>
          <div className="general-register step-register">
            <form onSubmit={handleFormSubmit}>
              {/* Step 1 */}
              {currentStep === 1 && (
                <div id="register-form-step1" className="form-inner v2_step1">
                  <ul>
                    <li>
                      <label htmlFor="username">ব্যবহারকারীর নাম</label>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="৪-১৫ অক্ষর	 নাম্বার এলাউ"
                        style={{ textTransform: "lowercase" }}
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                      {/* Error span - can be controlled by state */}
                      {/* <span id="username-error" className="error">ব্যবহারকারীর নাম বৈধ নয়.</span> */}
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
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {/* Error span - can be controlled by state */}
                      {/* <span id="password-error" className="error">পাসওয়ার্ড অবশ্যই 6~20 অক্ষরের হতে হবে, কমপক্ষে 1টি বড় হাতের অক্ষর, 1টি ছোট হাতের অক্ষর, 1টি সংখ্যা, বিশেষ অক্ষরের অনুমতি দিন (@$!%*#).</span> */}
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
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      {/* Error span - can be controlled by state */}
                      {/* <span id="confirmPassword-error" className="error">পাসওয়ার্ড অবশ্যই 6~20 অক্ষরের হতে হবে, কমপক্ষে 1টি বড় হাতের অক্ষর, 1টি ছোট হাতের অক্ষর, 1টি সংখ্যা, বিশেষ অক্ষরের অনুমতি দিন (@$!%*#).</span> */}
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
                      >
                        <option value="8">BDT</option>
                        <option value="7">INR</option>
                        <option value="24">NPR</option>
                        <option value="17">PKR</option>
                      </select>
                    </li>
                    <li>
                      <label htmlFor="friendReferCode">Refer Code</label>
                      <input
                        type="text"
                        id="friendReferCode"
                        name="friendReferCode"
                        value={formData.friendReferCode}
                        onChange={handleInputChange}
                        minLength={6}
                        maxLength={20}
                        placeholder="আপনার যদি থাকে তবে প্রবেশ করুন"
                      />
                    </li>
                  </ul>
                  <div className="form-btn-box">
                    <button
                      type="button"
                      className="btn-register-next"
                      onClick={nextStep}
                    ></button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
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
                        required
                        value={formData.realName}
                        onChange={handleInputChange}
                      />
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
                                <span>+{formData.callingCode}</span>
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
                          value={formData.callingCode}
                          onChange={handleInputChange}
                        />
                        <input
                          id="phoneNumber"
                          type="text"
                          name="phoneNumber"
                          placeholder="দয়া করে ফোন নম্বর লিখুন"
                          required
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </li>
                    <li>
                      <label htmlFor="email">ই-মেইল</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="একটি বৈধ ইমেল লিখুন"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </li>

                    {/* Captcha/Verification Code - Placeholder */}
                    {/* <li id="register-form-code" style={{ display: 'none' }}>...</li> */}

                    {/* Puzzle/Turnstile - Placeholder */}
                    {/* <div id="register-form-puzzle" style={{ display: 'none' }}>...</div> */}
                    {/* <div id="register-form-turnstile" className="input-group" style={{ display: 'none' }}>...</div> */}
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

                  <div className="form-btn-box">
                    <button
                      type="button"
                      id="goToStep1"
                      className="btn-register-prev"
                      onClick={prevStep}
                    >
                      আগে
                    </button>
                    <button
                      type="submit"
                      id="registerButton"
                      className="btn-register-submit"
                    >
                      পরবর্তী
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Register Banner Section */}
        <div className="right-register-banner">
          {/* This section would likely use a carousel library like react-slick as seen in Header */}
          {/* Placeholder for banner images */}
          {/* <ul id="register_banner_container">...</ul>*/}
        </div>
      </div>
    </div>
  );
};

export default Register;
