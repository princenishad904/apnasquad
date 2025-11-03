"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LucideLock } from "lucide-react"; // Importing icons for password toggle
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useSignUpMutation, useVerifyOtpMutation } from "@/redux/auth/authApi";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const SignUp = () => {
  // State to manage which step of the sign-up process is active
  // const [steps, setSteps] = useState(1); // 1 for sign up, 2 for otp verification
  // const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, { isLoading }] = useSignUpMutation();
  // const [verifyOtp, { isLoading: isVerifing }] = useVerifyOtpMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Handle the initial sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await signUp(user);

    if (error) return toast.error(error?.data?.message);

    if (data?.success) {
      setEmail(data?.data?.email);
      toast.success(data?.message);

      router.push("/login")
 
    }
  };


  return (
    // Main container with dark background and aurora effect
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-[#0A0426] font-sans text-white">
      {/* Aurora effect using a div with radial gradient and animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d025b] via-transparent to-[#04b218] opacity-30 animate-pulse-slow"></div>

      {/* Conditional rendering for different steps */}
    
        <Card className="z-10 w-full max-w-sm mx-auto p-6 bg-white/5 border-none backdrop-blur-sm rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_4px_50px_rgba(0,0,0,0.2)]">
          <CardHeader className="text-center p-0 ">
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              SIGN UP
            </CardTitle>
            <CardDescription className="text-sm text-gray-400 mt-2">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSignUp} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-300"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-lg"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-300"
                    >
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-lg pr-10"
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
                <div className="grid gap-2">
                  <Label
                    htmlFor="referralCode"
                    className="text-sm font-semibold text-gray-300"
                  >
                    Referral Code (optional)
                  </Label>
                  <Input
                    id="referralCode"
                    type="text"
                    name="referralCode"
                    className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 focus:border-purple-500 rounded-lg"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full  h-10 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Signing up...</span> <Loader />
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col   p-0">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
     
    </div>
  );
};

export default SignUp;
