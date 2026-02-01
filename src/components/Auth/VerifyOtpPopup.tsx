import React, { useState } from "react";
import { authService } from "../../lib/api/services";
import BaseModal from "../Promotion/BaseModal";
import ToastSuccess from "../../lib/ToastSuccess";
import ToastError from "../../lib/ToastError";
// import { EmailIcon } from "../Icon/EmailIcon";

interface VerifyOtpPopupProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onVerified: () => void;
    isAdmin?: boolean;
}

const VerifyOtpPopup: React.FC<VerifyOtpPopupProps> = ({
    isOpen,
    onClose,
    email,
    onVerified,
    isAdmin = false,
}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text").replace(/\D/g, "");
        const pasteData = pastedText.slice(0, 6).split("");

        if (pasteData.length > 0) {
            const newOtp = [...otp];
            pasteData.forEach((char, index) => {
                newOtp[index] = char;
            });
            setOtp(newOtp);

            // Focus the next available input or the last one
            const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
            const targetInput = document.getElementById(`otp-${nextIndex}`);
            if (targetInput) targetInput.focus();
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");

        if (otpString.length !== 6) {
            setErrorMessage("Please enter a valid 6-digit OTP");
            setErrorModalOpen(true);
            return;
        }

        setIsLoading(true);

        try {
            if (isAdmin) {
                await authService.verifyAdminOtp({ email, otp: otpString });
            } else {
                await authService.verifyOtp({ email, otp: otpString });
            }
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
            if (isAdmin) {
                await authService.resendAdminOtp({ email });
            } else {
                await authService.resendOtp({ email });
            }
            setErrorMessage("A new OTP has been sent to your email");
            setOtp(["", "", "", "", "", ""]);
            setErrorModalOpen(true);
        } catch (error: any) {
            console.error("Resend OTP failed:", error);
            setErrorMessage(error?.message || "Failed to resend OTP. Please try again.");
            setErrorModalOpen(true);
        } finally {
            setIsResending(false);
        }
    };

    if (!isOpen) return null;

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
                        <div className="flex justify-between gap-2 md:mb-[24px] mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-10 h-12 md:w-12 md:h-14 border border-yellow-400/20 rounded-lg text-center text-xl font-bold bg-yellow-400/5 text-white focus:border-yellow-400 focus:outline-none transition-all"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

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
