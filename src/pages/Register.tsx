import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Register.scss";
import { useSearchParams } from "react-router-dom";

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const refCodeParam = searchParams.get("refcode") || "";

  console.log({refCodeParam})

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
      image:"https://c8.alamy.com/comp/PHN4DX/casino-design-with-777-jackpot-and-money-coins-over-purple-background-colorful-design-vector-illustration-PHN4DX.jpg",
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
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass refCode as part of the API body
    const apiBody = {
      ...formData,
      refer_code: formData.refCode,
    };
    
  };

  const nextStep = () => {
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
                          value={formData?.refCode}
                          onChange={handleInputChange}
                          placeholder="Referral code"
                          readOnly={!!refCodeParam}
                        />
                      </li>
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
                    </ul>
                    <div className="form-btn-box">
                      <button
                        type="button"
                        className="btn-register-next"
                        onClick={nextStep}
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
    </div>
  );
};

export default Register;
