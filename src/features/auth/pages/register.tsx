import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { registerSchema } from "../schemas";
import { useRegisterMutation } from "../api/mutations";
import type { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: undefined,
      date_of_birth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const registrationData = {
      ...data,
      primary_role: "patient" as const,
    };
    await registerMutation.mutateAsync(registrationData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-(--color-brown-dark) overflow-hidden">
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
          {/* Additional decorative element */}
          <div 
            className="absolute bottom-1/4 left-1/4 w-[100px] h-[100px] rounded-full border-[20px] border-(--color-peach-light)/20"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 h-full w-full">
          <div>
            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
              Start Your <br />
              Journey <br />
              <span className="text-(--color-peach-light)">with Elora</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-sm">
              Join thousands who've discovered smarter, personalized skin care
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="/img/icons/elora-logo.svg"
              alt="Elora Logo"
              className="h-10 brightness-0 invert"
            />
            <p className="text-white/80 text-sm max-w-xs">
              AI-powered dermatology that's accessible and inclusive for everyone
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-7/12 bg-white flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        {/* Close Button */}
        <Link
          to="/landing"
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </Link>

        <div className="w-full max-w-2xl py-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-(--color-gray-darker) mb-2">
              Create Account
            </h2>
            <p className="text-(--color-slate)">
              Fill in your details to get started with Elora
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-(--color-gray-darker) text-sm">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="first_name"
                      placeholder="Enter your first name"
                      className="h-12 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                      aria-invalid={!!errors.first_name}
                    />
                  )}
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">{errors.first_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-(--color-gray-darker) text-sm">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="last_name"
                      placeholder="Enter your last name"
                      className="h-12 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                      aria-invalid={!!errors.last_name}
                    />
                  )}
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-(--color-gray-darker) text-sm">
                  Email Address <span className="text-red-500">*</span>
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

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-(--color-gray-darker) text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <Input
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="h-12 pl-10 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                        aria-invalid={!!errors.phone}
                      />
                    </div>
                  )}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Gender and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-(--color-gray-darker) text-sm">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-12 w-full border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className="text-(--color-gray-darker) text-sm">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="date_of_birth"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                          <line x1="16" x2="16" y1="2" y2="6"/>
                          <line x1="8" x2="8" y1="2" y2="6"/>
                          <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                      </div>
                      <Input
                        {...field}
                        id="date_of_birth"
                        type="date"
                        className="h-12 pl-10 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                        aria-invalid={!!errors.date_of_birth}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  )}
                />
                {errors.date_of_birth && (
                  <p className="text-sm text-red-500">{errors.date_of_birth.message}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-(--color-gray-darker) text-sm">
                  Password <span className="text-red-500">*</span>
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
                        placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-(--color-gray-darker) text-sm">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="confirmPassword"
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
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="h-12 pl-10 pr-10 border-gray-200 rounded-lg focus:border-(--color-brown-dark) focus:ring-(--color-brown-dark)"
                        aria-invalid={!!errors.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-12 bg-(--color-brown-dark) hover:bg-(--color-brown) text-white font-medium rounded-lg transition-colors"
              >
                {registerMutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-(--color-slate) text-sm">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-(--color-brown-dark) hover:text-(--color-brown) font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>

            {/* Disclaimer */}
            <p className="text-center text-(--color-gray-blue) text-xs pt-2">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
              Elora is HIPAA compliant and your data is encrypted and secure.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
