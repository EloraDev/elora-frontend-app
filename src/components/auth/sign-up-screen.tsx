"use client";

import type React from "react";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Progress } from "../ui/progress";

interface SignUpScreenProps {
  onAuthSuccess: (user: any) => void;
  onSwitchToSignIn: () => void;
}

export function SignUpScreen({
  onAuthSuccess,
  onSwitchToSignIn,
}: SignUpScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock successful registration
    const mockUser = {
      id: "1",
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "patient",
      memberSince: new Date().toISOString(),
      totalScans: 0,
      lastLogin: new Date().toISOString(),
    };

    setIsLoading(false);
    onAuthSuccess(mockUser);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return formData.email && formData.phone;
      case 3:
        return formData.dateOfBirth && formData.gender;
      case 4:
        return (
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      default:
        return false;
    }
  };

  const stepTitles = [
    "Let's get started",
    "Contact information",
    "Personal details",
    "Secure your account",
  ];

  const stepDescriptions = [
    "Tell us your name",
    "How can we reach you?",
    "A bit more about you",
    "Create a strong password",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12 space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Creating Your Account
              </h3>
              <p className="text-gray-600 text-sm">
                Setting up your personalized health dashboard...
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Join Elora
            </h1>
            <p className="text-gray-600 mt-2">
              Your journey to better skin health starts here
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i + 1 <= currentStep
                  ? "bg-gradient-to-r from-blue-600 to-green-600"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Step Header */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {stepTitles[currentStep - 1]}
                </h2>
                <p className="text-gray-600 text-sm">
                  {stepDescriptions[currentStep - 1]}
                </p>
              </div>

              <form
                onSubmit={
                  currentStep === totalSteps
                    ? handleSignUp
                    : (e) => e.preventDefault()
                }
              >
                {/* Step 1: Name */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Details */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 4: Password */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="pl-10 pr-10 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className="pl-10 pr-10 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-medium text-gray-700">
                        Password requirements:
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              formData.password.length >= 8
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span className="text-xs text-gray-600">
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              /[A-Z]/.test(formData.password)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span className="text-xs text-gray-600">
                            One uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              /[0-9]/.test(formData.password)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <span className="text-xs text-gray-600">
                            One number
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) =>
                          setAgreeToTerms(checked as boolean)
                        }
                        className="mt-0.5"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-700 leading-relaxed"
                      >
                        I agree to Elora's{" "}
                        <Button
                          variant="link"
                          className="text-sm text-blue-600 p-0 h-auto underline"
                        >
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button
                          variant="link"
                          className="text-sm text-blue-600 p-0 h-auto underline"
                        >
                          Privacy Policy
                        </Button>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex space-x-3 pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 h-12 bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!canProceed() || !agreeToTerms}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Create Account
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={onSwitchToSignIn}
              className="text-blue-600 p-0 font-semibold"
            >
              Sign in here
            </Button>
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>FDA Approved AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
