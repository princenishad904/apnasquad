"use client";
import { Button } from "@/components/ui/button";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import React, { useState } from "react";
import toast from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const ForgotPassword = () => {
  const [steps, setSteps] = useState(3); // 1 = emmail, 2 = otp, 3 = reset password
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSendOtp = async () => {};

  // handle verify OTP
  const handleVerifyOtp = async () => {};

  // handle verify OTP
  const handleResetPassword = async () => {};

  return (
    <div className="w-full h-[88vh] grid place-content-center dark bg-tarnsparent ">
      {steps === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password ? </CardTitle>

            {message ? (
              <CardDescription className={"text-red-500"}>
                {message}
              </CardDescription>
            ) : (
              <CardDescription>
                Verify your email and reset password with secure
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={handleSendOtp}
              className="w-full mt-6 cursor-pointer"
            >
              Request OTP
            </Button>
          </CardContent>
        </Card>
      ) : steps === 2 ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Verify OTP </CardTitle>

            {message ? (
              <CardDescription className={"text-red-500"}>
                {message}
              </CardDescription>
            ) : (
              <CardDescription>Enter 6 DIGIT OTP</CardDescription>
            )}

            <span className="text-sm text-red-500">{message}</span>
          </CardHeader>
          <CardContent>
            <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button onClick={handleVerifyOtp} className="mt-6">
              Verify OTP
            </Button>
          </CardContent>
        </Card>
      ) : steps === 3 ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            {message ? (
              <CardDescription className={"text-red-500"}>
                {message}
              </CardDescription>
            ) : (
              <CardDescription>
                Reset your password with carefully
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cpassword">Confrim Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>
            </div>
            <Button
              onClick={handleResetPassword}
              className="w-full mt-6 cursor-pointer"
            >
              Reset Password
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default ForgotPassword;
