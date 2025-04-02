'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from '@/services/auth';

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await signUp({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: 'user', // Default role
      });

      if (response.success) {
        // Store email for verification
        localStorage.setItem('verificationEmail', formData.email);
        router.push('/verify');
      } else {
        setApiError(response.message);
      }
    } catch (error) {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white pt-20">
      <div className="w-full max-w-[360px] space-y-5 px-4">
        <h1 className="text-2xl font-semibold text-center text-[#1a237e] mb-4">
          Sign Up Today!
        </h1>

        {apiError && (
          <div className="bg-red-50 text-red-500 text-[13px] p-3 rounded-xl">
            {apiError}
          </div>
        )}

        {/* Google Sign Up Button */}
        <button className="w-full flex items-center justify-center gap-2 px-3.5 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors text-[13px]">
          <FcGoogle className="w-4 h-4" />
          <span className="text-[#4285f4] font-medium">Sign Up with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="px-3 bg-white text-gray-500">Or Sign Up with Email</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label htmlFor="fullName" className="block text-[#4a5568] mb-1 text-[13px]">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-3 py-[7px] text-[13px] rounded-xl border ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent placeholder:text-gray-500`}
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) {
                  setErrors({ ...errors, fullName: undefined });
                }
              }}
            />
            {errors.fullName && (
              <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-[#4a5568] mb-1 text-[13px]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className={`w-full px-3 py-[7px] text-[13px] rounded-xl border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent placeholder:text-gray-500`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: undefined });
                }
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-[#4a5568] mb-1 text-[13px]">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className={`w-full px-3 py-[7px] text-[13px] rounded-xl border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent placeholder:text-gray-500`}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-[#4a5568] mb-1 text-[13px]">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Enter password"
              className={`w-full px-3 py-[7px] text-[13px] rounded-xl border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent placeholder:text-gray-500`}
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: undefined });
                }
              }}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[11px] mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 bg-[#1a237e] text-white rounded-xl hover:bg-[#283593] transition-colors font-medium text-[13px] mt-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Continue'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-3">
          <p className="text-gray-600 text-[13px]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1a237e] hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <p className="text-[11px] text-gray-500 text-center mt-4">
          By clicking 'Continue', you acknowledge that you have read and accepted our{' '}
          <Link href="/terms" className="text-[#1a237e] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#1a237e] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
} 