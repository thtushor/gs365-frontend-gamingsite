import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../lib/api/services";
import { PasswordInput } from "../components/Auth/LoginPopup";
import BaseModal from "../components/Promotion/BaseModal";
import ToastSuccess from "../lib/ToastSuccess";
import ToastError from "../lib/ToastError";

const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!token) {
            setErrorMessage("Invalid or missing reset token");
            setErrorModalOpen(true);
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Record<string, string> = {};

        if (!newPassword) {
            newErrors.newPassword = "Password is required";
        } else if (newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!token) {
            setErrorMessage("Invalid reset token");
            setErrorModalOpen(true);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            await authService.resetPassword({ token, newPassword });
            setSuccessModalOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error: any) {
            console.error("Reset password failed:", error);
            setErrorMessage(
                error?.message || "Failed to reset password. Please try again."
            );
            setErrorModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <div className="w-full max-w-md">
                <div className="pop-wrap login">
                    <div className="pop-title px-[10px] md:px-[20px] py-[8px] md:py-[20px]">
                        <h3 className="text-[16px] md:text-[20px]">Reset Your Password</h3>
                    </div>
                    <div className="pop-inner py-3 px-4 md:p-6">
                        <p className="text-center mb-4 text-sm md:text-base">
                            Enter your new password below
                        </p>
                        <form onSubmit={handleSubmit}>
                            <ul className="input-group md:mb-[24px] mb-2">
                                <li className="md:mb-5 mb-2">
                                    <label className="md:mb-2 text-left md:text-center">
                                        New Password
                                    </label>
                                    <PasswordInput
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            if (errors.newPassword) {
                                                setErrors((prev) => ({ ...prev, newPassword: "" }));
                                            }
                                        }}
                                        placeholder="Enter new password"
                                        minLength={6}
                                        maxLength={20}
                                        error={errors.newPassword}
                                        required
                                    />
                                </li>
                                <li className="md:mb-5 mb-2">
                                    <label className="md:mb-2 text-left md:text-center">
                                        Confirm Password
                                    </label>
                                    <PasswordInput
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (errors.confirmPassword) {
                                                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                                            }
                                        }}
                                        placeholder="Confirm new password"
                                        minLength={6}
                                        maxLength={20}
                                        error={errors.confirmPassword}
                                        required
                                    />
                                </li>
                            </ul>

                            <button
                                className="btn-default-xs md:my-6 my-4 text-[14px] md:text-[16px] py-[10px] md:p-[14px] w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>

                            <p className="md:my-4 text-center">
                                Remember your password?{" "}
                                <a
                                    className="link cursor-pointer"
                                    onClick={() => navigate("/")}
                                >
                                    Back to Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <BaseModal
                open={successModalOpen}
                showClose={false}
                onClose={() => setSuccessModalOpen(false)}
            >
                <ToastSuccess
                    title="Password Reset!"
                    description="Your password has been reset successfully. You can now login with your new password."
                    onClose={setSuccessModalOpen}
                    location="/"
                    extraFn={() => { }}
                />
            </BaseModal>

            {/* Error Modal */}
            <BaseModal
                open={errorModalOpen}
                showClose={false}
                onClose={() => setErrorModalOpen(false)}
            >
                <ToastError
                    title="Reset Failed"
                    description={errorMessage}
                    onClose={setErrorModalOpen}
                    isRedirect={false}
                    location="/"
                    extraFn={() => { }}
                />
            </BaseModal>
        </div>
    );
};

export default ResetPasswordPage;
