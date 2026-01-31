import React, { useState } from "react";
import { authService } from "../../lib/api/services";
import BaseModal from "../Promotion/BaseModal";
import ToastSuccess from "../../lib/ToastSuccess";
import ToastError from "../../lib/ToastError";

interface VerifyOtpPopupProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onVerified: () => void;
}

const VerifyOtpPopup: React.FC<VerifyOtpPopupProps> = ({
    isOpen,
    onClose,
    email,
    onVerified,
}) => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setErrorMessage("Please enter a valid 6-digit OTP");
            setErrorModalOpen(true);
            return;
        }

        setIsLoading(true);

        try {
            await authService.verifyOtp({ email, otp });
            setSuccessModalOpen(true);
            setTimeout(() => {
                onVerified();
                onClose();
            }, 2000);
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            setErrorMessage(
                error?.message || "Invalid OTP. Please check and try again."
            );
            setErrorModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);

        try {
            await authService.resendOtp({ email });
            setErrorMessage("A new OTP has been sent to your email");
            setErrorModalOpen(true);
        } catch (error: any) {
            console.error("Resend OTP failed:", error);
            setErrorMessage(error?.message || "Failed to resend OTP. Please try again.");
            setErrorModalOpen(true);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="login-pop-group" id="verifyOtpPopup">
            <div className="pop-wrap login">
                <div className="pop-title px-[10px] md:px-[20px] py-[8px] md:py-[20px]">
                    <h3 className="text-[16px] md:text-[20px]">Verify Your Email</h3>
                    <div className="btn-close" onClick={onClose}></div>
                </div>
                <div className="pop-inner py-3 px-4 md:p-6">
                    <p className="text-center mb-4 text-sm md:text-base">
                        We've sent a 6-digit OTP to <strong>{email}</strong>
                    </p>
                    <form onSubmit={handleVerifyOtp}>
                        <ul className="input-group md:mb-[24px] mb-2">
                            <li className="md:mb-5 mb-2">
                                <label className="md:mb-2 text-left md:text-center">
                                    Enter OTP
                                </label>
                                <div className="input-icon-type">
                                    <i className="icon-mail"></i>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value.replace(/\D/g, ""))
                                        }
                                        required
                                    />
                                </div>
                            </li>
                        </ul>

                        <button
                            className="btn-default-xs md:my-6 my-4 text-[14px] md:text-[16px] py-[10px] md:p-[14px]"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <p className="md:my-4 text-center">
                            Didn't receive the code?{" "}
                            <a
                                className="link cursor-pointer"
                                onClick={handleResendOtp}
                                style={{ pointerEvents: isResending ? "none" : "auto" }}
                            >
                                {isResending ? "Resending..." : "Resend OTP"}
                            </a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            <BaseModal
                open={successModalOpen}
                showClose={false}
                onClose={() => setSuccessModalOpen(false)}
            >
                <ToastSuccess
                    title="Email Verified!"
                    description="Your email has been verified successfully. You can now login."
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
                    title="Verification Failed"
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

export default VerifyOtpPopup;
