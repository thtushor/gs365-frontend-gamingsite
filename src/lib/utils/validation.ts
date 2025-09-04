import { isValidPhoneNumber } from "react-phone-number-input";

// Validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Registration form validation
export const validateRegistrationForm = (data: {
  username: string;
  password: string;
  confirmPassword: string;
  currencyType: string;
  friendReferCode?: string;
  realName: string;
  callingCode: string;
  phoneNumber: string;
  email: string;
  ageCheck: boolean;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  console.log(data.phoneNumber);
  // Username validation
  if (!data.username.trim()) {
    errors.push({ field: "username", message: "ব্যবহারকারীর নাম প্রয়োজন" });
  } else if (data.username.length < 4 || data.username.length > 15) {
    errors.push({
      field: "username",
      message: "ব্যবহারকারীর নাম ৪-১৫ অক্ষরের মধ্যে হতে হবে",
    });
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.push({
      field: "username",
      message:
        "ব্যবহারকারীর নাম শুধুমাত্র অক্ষর, সংখ্যা এবং আন্ডারস্কোর থাকতে পারে",
    });
  }

  // Password validation
  if (!data.password) {
    errors.push({ field: "password", message: "পাসওয়ার্ড প্রয়োজন" });
  } else if (data.password.length < 6 || data.password.length > 20) {
    errors.push({
      field: "password",
      message: "পাসওয়ার্ড ৬-২০ অক্ষরের মধ্যে হতে হবে",
    });
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(data.password)) {
    errors.push({
      field: "password",
      message: "পাসওয়ার্ডে কমপক্ষে একটি অক্ষর এবং একটি সংখ্যা থাকতে হবে",
    });
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "পাসওয়ার্ড নিশ্চিত করুন প্রয়োজন",
    });
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "পাসওয়ার্ড মিলছে না" });
  }

  // Currency validation
  if (!data.currencyType) {
    errors.push({
      field: "currencyType",
      message: "কারেন্সি নির্বাচন করুন প্রয়োজন",
    });
  }

  // Real name validation
  if (!data.realName.trim()) {
    errors.push({ field: "realName", message: "সম্পূর্ণ নাম প্রয়োজন" });
  } else if (data.realName.length < 2 || data.realName.length > 100) {
    errors.push({
      field: "realName",
      message: "সম্পূর্ণ নাম ২-১০০ অক্ষরের মধ্যে হতে হবে",
    });
  }

  // Phone number validation
  if (!data.phoneNumber.trim()) {
    errors.push({ field: "phoneNumber", message: "ফোন নম্বর প্রয়োজন" });
  } else if (!isValidPhoneNumber(data.phoneNumber)) {
    errors.push({ field: "phoneNumber", message: "সঠিক ফোন নম্বর লিখুন" });
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: "email", message: "ইমেল প্রয়োজন" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "সঠিক ইমেল ঠিকানা লিখুন" });
  }

  // Age check validation
  if (!data.ageCheck) {
    errors.push({
      field: "ageCheck",
      message: "আপনি ১৮ বছর বয়সী এবং শর্তাদিতে সম্মত হতে হবে",
    });
  }

  // Refer code validation (optional)
  if (data.friendReferCode && data.friendReferCode.length < 6) {
    errors.push({
      field: "friendReferCode",
      message: "রেফার কোড কমপক্ষে ৬ অক্ষরের হতে হবে",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Transform form data to API format
export const transformRegistrationData = (formData: {
  username: string;
  password: string;
  confirmPassword: string;
  currencyType: string;
  friendReferCode?: string;
  realName: string;
  callingCode: string;
  phoneNumber: string;
  email: string;
  ageCheck: boolean;
}) => {
  // Combine calling code and phone number
  const fullPhone = `${formData.phoneNumber}`;

  return {
    username: formData.username.trim().toLowerCase(),
    fullname: formData.realName.trim(),
    phone: fullPhone,
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    currency_id: formData.currencyType || 1,
    refer_code: formData.friendReferCode?.trim() || undefined,
    isAgreeWithTerms: formData.ageCheck,
  };
};

// Transform form data to API format
export const transformAffiliateRegistrationData = (formData: {
  username: string;
  password: string;
  confirmPassword: string;
  currencyType: string;
  friendReferCode?: string;
  realName: string;
  callingCode: string;
  phoneNumber: string;
  email: string;
  ageCheck: boolean;
}) => {
  // Map currency type to currency_id
  // const currencyIdMap: Record<string, number> = {
  //   "8": 1, // BDT
  //   "7": 2, // INR
  //   "24": 3, // NPR
  //   "17": 4, // PKR
  // };

  return {
    username: formData.username.trim().toLowerCase(),
    fullname: formData.realName.trim(),
    phone: formData.phoneNumber,
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    // currency: currencyIdMap[formData.currencyType] || 1,
    currency: formData.currencyType || 1,
    refCode: formData.friendReferCode?.trim() || undefined,
    status: "inactive",
    role: "superAffiliate",
  };
};

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format based on length
  if (cleaned.length === 11 && cleaned.startsWith("01")) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  }

  return cleaned;
};

// Email validation helper
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const getPasswordStrength = (
  password: string
): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("কমপক্ষে ৮ অক্ষর প্রয়োজন");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("কমপক্ষে একটি ছোট হাতের অক্ষর প্রয়োজন");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("কমপক্ষে একটি বড় হাতের অক্ষর প্রয়োজন");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("কমপক্ষে একটি সংখ্যা প্রয়োজন");
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("কমপক্ষে একটি বিশেষ অক্ষর প্রয়োজন");
  }

  return { score, feedback };
};
