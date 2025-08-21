"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import {
  useResetPasswordMutation,
  useSendOtpForResetPasswordMutation,
  useVerifyOtpForResetPasswordMutation,
} from "@/redux/auth/authApi";
import { useRouter } from "next/navigation";

// Simple Loader component to replace the external one
const Loader = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
);

// Inline SVG icons to avoid external dependencies
const Eye = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.46-1.07" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

// Mock API hooks to make the code self-contained
const useForgotPasswordMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendOtp = async (email) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        if (email === "test@example.com") {
          resolve({
            data: { success: true, message: "OTP sent successfully." },
            error: null,
          });
        } else {
          resolve({
            data: null,
            error: { data: { message: "Email not found." } },
          });
        }
      }, 1500);
    });
  };
  return [sendOtp, { isLoading }];
};

const useVerifyOtpMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const verifyOtp = async ({ otp }) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        // OTP ko 4 digits par check kar rahe hain
        if (otp === "1234") {
          resolve({
            data: { success: true, message: "OTP verified successfully." },
            error: null,
          });
        } else {
          resolve({
            data: null,
            error: { data: { message: "Invalid OTP." } },
          });
        }
      }, 1500);
    });
  };
  return [verifyOtp, { isLoading }];
};

const ForgotPassword = () => {
  const [steps, setSteps] = useState(1);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const [sendOtpForResetPassword, { isLoading: isSendingOtp }] =
    useSendOtpForResetPasswordMutation();

  const [verifyOtpForResetPassword, { isLoading: isVerifyingOtp }] =
    useVerifyOtpForResetPasswordMutation();

  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetPasswordMutation();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Email field cannot be empty.");
      return;
    }
    const { data, error } = await sendOtpForResetPassword(email);
    if (error) {
      setErrorMessage(error?.data?.message || "Something went wrong.");
      return;
    }
    if (data?.success) {
      setErrorMessage("");
      toast.success(data?.message);
      setSteps(2);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const { data, error } = await verifyOtpForResetPassword({ email, otp });
    if (error) {
      setErrorMessage(error?.data?.message || "Something went wrong.");
      return;
    }
    if (data?.success) {
      setErrorMessage("");
      toast.success(data?.message);
      setSteps(3);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const { data, error } = await resetPassword({ email, password, cpassword });

    if (error) {
      setErrorMessage(error?.data?.message || "Something went wrong.");
      return;
    }
    if (data?.success) {
      setErrorMessage("");
      toast.success(data?.message);
      router.push("/login");
      // Redirect to login page - removed router.push for self-contained code
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-[#0A0426] font-sans text-white">
      {/* Dynamic Background with Gradients and Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-gray-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] bg-gray-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[70%] left-[30%] w-[500px] h-[500px] bg-gray-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Form Card */}
      <div className="z-10 w-full max-w-md mx-auto p-8 bg-transparent rounded-3xl ">
        {steps === 1 ? (
          <>
            <div className="text-center p-0 mb-6">
              <h2 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-200">
                FORGOT PASSWORD
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Verify your email to reset your password.
              </p>
            </div>
            <div className="p-0">
              <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-300 block"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-1 bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-xl px-4 py-2 outline-none"
                  />
                </div>
                {errorMessage && (
                  <p className="text-sm text-center text-red-500 font-semibold">
                    {errorMessage}
                  </p>
                )}
                <button
                  onClick={handleSendOtp}
                  className="w-full h-12 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSendingOtp}
                >
                  {isSendingOtp ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">Sending OTP...</span> <Loader />
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            </div>
          </>
        ) : steps === 2 ? (
          <>
            <div className="text-center p-0 mb-6">
              <h2 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                VERIFY OTP
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                We have sent a 4-digit code to your email.
              </p>
            </div>
            <div className="flex flex-col items-center p-0 gap-4">
              {/* Ab 4-digit OTP ke liye input fields */}
              <div className="flex gap-2">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                    className="w-12 h-12 text-center text-lg rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-500 outline-none"
                  />
                ))}
              </div>
              {errorMessage && (
                <p className="text-sm text-center text-red-500 font-semibold">
                  {errorMessage}
                </p>
              )}
              <button
                onClick={handleVerifyOtp}
                // Ab 4-digit OTP length ke liye check kar rahe hain
                disabled={otp.length !== 4 || isVerifyingOtp}
                className="w-full h-12 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifyingOtp ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm">Verifying...</span> <Loader />
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </>
        ) : steps === 3 ? (
          <>
            <div className="text-center p-0 mb-6">
              <h2 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                RESET PASSWORD
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Choose a new, secure password.
              </p>
            </div>
            <div className="p-0">
              <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-300 block"
                  >
                    New Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-xl px-4 py-2 pr-10 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cpassword"
                    className="text-sm font-semibold text-gray-300 block"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="cpassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="cpassword"
                      placeholder="confirm password"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      required
                      className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-xl px-4 py-2 pr-10 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {errorMessage && (
                <p className="text-sm text-center text-red-500 font-semibold">
                  {errorMessage}
                </p>
              )}
              <button
                onClick={handleResetPassword}
                className="w-full mt-4 h-12 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isResettingPassword}
              >
                {isResettingPassword ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm">Resetting...</span> <Loader />
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
