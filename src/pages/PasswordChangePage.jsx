import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// ...imports and component start

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const passwordRules = {
    length: newPassword.length >= 6 && newPassword.length <= 20,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    specialChar: /[!@#$%*]/.test(newPassword),
  };

  const allRulesPassed = Object.values(passwordRules).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword;

  useEffect(() => {
    // Remove currentPassword from validation since backend doesn't use it
    if (allRulesPassed && passwordsMatch) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");

    if (!userData || !accessToken) {
      alert("You are not logged in.");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      const userId = parsedUser.id;

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/update/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      // toast.success("Password changed successfully!");
      navigate("/profile/login-security");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-[70vh] py-7 bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] p-6 rounded-lg shadow-lg text-left">
        <h1 className="text-[22px] flex items-center font-bold mb-5">
          <button
            onClick={() => navigate("/profile/login-security")}
            className="font-bold px-4 text-[25px] mr-2 hover:text-yellow-400"
          >
            <IoIosArrowBack />
          </button>
          Change password
        </h1>

        {/* Current Password (Visible but not required) */}
        {/* <label className="block mb-2">Current password</label>
        <input
          type="password"
          placeholder="Enter your current password"
          className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-4"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, current: true }))}
        /> */}
        {/* Hide validation for now */}
        {/* {!currentPassword && touched.current && (
          <p className="text-red-500 text-sm mb-4">This field is required.</p>
        )} */}

        {/* New Password */}
        <label className="block mb-2 mt-4">New password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, new: true }))}
        />

        {/* Password Rules */}
        <ul className="text-sm mb-4 space-y-1">
          <li
            className={passwordRules.length ? "text-green-500" : "text-red-500"}
          >
            {passwordRules.length ? "✓" : "✕"} Must be 6–20 characters
          </li>
          <li
            className={
              passwordRules.uppercase ? "text-green-500" : "text-red-500"
            }
          >
            {passwordRules.uppercase ? "✓" : "✕"} Must contain 1 uppercase (A–Z)
          </li>
          <li
            className={
              passwordRules.lowercase ? "text-green-500" : "text-red-500"
            }
          >
            {passwordRules.lowercase ? "✓" : "✕"} Must contain 1 lowercase (a–z)
          </li>
          <li
            className={passwordRules.number ? "text-green-500" : "text-red-500"}
          >
            {passwordRules.number ? "✓" : "✕"} Must contain 1 number (0–9)
          </li>
          <li
            className={
              passwordRules.specialChar ? "text-green-500" : "text-red-500"
            }
          >
            {passwordRules.specialChar ? "✓" : "✕"} Allowed special symbols
            (!@#$%*)
          </li>
        </ul>

        {/* Confirm Password */}
        <label className="block mb-2">Confirm new password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
        />
        {!passwordsMatch && confirmPassword && (
          <p className="text-red-500 text-sm mb-4">Passwords do not match.</p>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-2 text-base hover:border-transparent font-medium rounded mt-4 transition ${
            isFormValid
              ? "bg-yellow-400 hover:bg-yellow-700 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Change password
        </button>
      </div>
    </div>
  );
};

export default PasswordChangePage;
