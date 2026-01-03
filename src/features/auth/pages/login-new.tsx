import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { loginSchema } from "../schemas";
import { useLoginMutation } from "../api/mutations";
import type { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPageNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-(--color-brown-dark) overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0">
          {/* Large circle - bottom right */}
          <div 
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border-[60px] border-(--color-brown)/30"
          />
          {/* Medium circle - top left */}
          <div 
            className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full border-[40px] border-(--color-brown)/20"
          />
          {/* Small circle accent */}
          <div 
            className="absolute top-1/3 right-1/4 w-[150px] h-[150px] rounded-full bg-(--color-brown)/10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 h-full w-full">
          <div>
            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
              Welcome <br />
              Back to <br />
              <span className="text-(--color-peach-light)">Elora</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="/img/icons/elora-logo.svg"
              alt="Elora Logo"
              className="h-10 brightness-0 invert"
            />
            <p className="text-white/80 text-sm max-w-xs">
              AI-powered dermatology care that's smarter, faster, and more accessible
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 relative">
        {/* Close Button */}
        <Link
          to="/landing"
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </Link>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-(--color-gray-darker) mb-2">
              Welcome Back
            </h2>
            <p className="text-(--color-slate)">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-(--color-gray-darker) text-sm">
                Email
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 pl-10 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                      aria-invalid={!!errors.email}
                    />
                  </div>
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-(--color-gray-darker) text-sm">
                Password
              </Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 pl-10 pr-10 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                />
                <span className="text-sm text-(--color-slate)">Remember me</span>
              </label>
              <Link
                to="/auth/login"
                className="text-sm text-(--color-brown-dark) hover:text-(--color-brown) font-medium transition-colors"
              >
                Forgot Password
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 bg-(--color-brown-dark) hover:bg-(--color-brown) text-white font-medium rounded-lg transition-colors"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-(--color-slate) text-sm">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-(--color-brown-dark) hover:text-(--color-brown) font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
