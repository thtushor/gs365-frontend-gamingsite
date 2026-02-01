import React, { useState } from "react";
import { authService } from "../../lib/api/services";
import BaseModal from "../Promotion/BaseModal";
import ToastSuccess from "../../lib/ToastSuccess";
import ToastError from "../../lib/ToastError";
import AuthInput from "./AuthInput";
import { EmailIcon } from "../Icon/EmailIcon";

interface ForgotPasswordPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("Please enter your email address");
            setErrorModalOpen(true);
            return;
        }

        setIsLoading(true);

        try {
            await authService.forgotPassword({ email });
            setSuccessModalOpen(true);
            setEmail("");
        } catch (error: any) {
            console.error("Forgot password failed:", error);
            setErrorMessage(
                error?.message || "Failed to send reset link. Please try again."
            );
            setErrorModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-pop-group" id="forgotPasswordPopup">
            <div className="pop-wrap login">
                <div className="pop-title px-[10px] md:px-[20px] py-[8px] md:py-[20px]">
                    <h3 className="text-[16px] md:text-[20px]">Reset Password</h3>
                    <div className="btn-close" onClick={onClose}></div>
                </div>
                <div className="pop-inner py-3 px-4 md:p-6">
                    <p className="text-center mb-4 text-sm md:text-base">
                        Enter your email address and we'll send you a link to reset your
                        password.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <ul className="input-group md:mb-[24px] mb-2">
                            <AuthInput
                                as="li"
                                wrapperClassName="md:mb-5 mb-2"
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<EmailIcon color="#ffd700" />}
                                required
                            />
                        </ul>

                        <button
                            className="btn-default-xs md:my-6 my-4 text-[14px] md:text-[16px] py-[10px] md:p-[14px]"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <p className="md:my-4 text-center">
                            Remember your password?{" "}
                            <a
                                className="link cursor-pointer"
                                onClick={onClose}
                            >
                                Back to Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            <BaseModal
                open={successModalOpen}
                showClose={false}
                onClose={() => {
                    setSuccessModalOpen(false);
                    onClose();
                }}
            >
                <ToastSuccess
                    title="Reset Link Sent!"
                    description="Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
                    onClose={() => {
                        setSuccessModalOpen(false);
                        onClose();
                    }}
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
                    title="Request Failed"
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

export default ForgotPasswordPopup;
