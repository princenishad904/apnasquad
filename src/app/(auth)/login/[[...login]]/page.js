"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoginMutation } from "@/redux/auth/authApi";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";
import { Eye, EyeOff, LucideLock } from "lucide-react"; // Importing icons for password toggle

const Login = () => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await login(user);

    if (error) return toast.error(error?.data?.message);

    if (data?.success) {
      console.log(data?.data.user);
      dispatch(setUser({ user: data?.data?.user }));
      toast.success(data?.message);

      router.push("/");
    }
  };

  return (
    // Main container with dark background and aurora effect
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-[#0a042600] font-sans text-white">
      {/* Aurora effect using a div with radial gradient and animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#470260] via-transparent to-[#000000] opacity-30 animate-pulse-slow"></div>

      {/* Main card container with translucent background */}
      <Card className="z-10 w-full max-w-sm mx-auto p-6  bg-transparent border-none backdrop-blur-sm  transition-all duration-300 hover:shadow-[0_4px_50px_rgba(0,0,0,0.2)]">
        <CardHeader className="text-center p-0 mb-8">
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            LOGIN
          </CardTitle>
          <CardDescription className="text-sm text-gray-400 mt-2">
            Enter your details to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
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
                <Link
                  href="/reset-password"
                  className="ml-auto inline-block text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 h-11 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Logging in...</span>
                  <Loader />
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-4 p-0">
          <p className="text-sm text-gray-400">
            Dont have an account?{" "}
            <Link href="/sign-up" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
