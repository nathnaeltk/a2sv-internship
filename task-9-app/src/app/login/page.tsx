'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from '@/services/auth';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const response = await signIn({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        // Redirect to dashboard or home page
        router.push('/dashboard');
      } else {
        setApiError(response.message);
      }
    } catch (error) {
      setApiError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white justify-center">
      <div className="w-full max-w-[360px] space-y-5 px-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#1a237e] text-center">
            Welcome Back,
          </h1>
          
          {apiError && (
            <div className="bg-red-50 text-red-500 text-[13px] p-3 rounded-xl mt-4">
              {apiError}
            </div>
          )}

          <button className="w-full flex items-center justify-center gap-2 px-3.5 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors text-[13px]">
            <FcGoogle className="w-4 h-4" />
            <span className="text-[#4285f4] font-medium">Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="px-3 bg-white text-gray-500">Or Login with Email</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 bg-[#1a237e] text-white rounded-xl hover:bg-[#283593] transition-colors font-medium text-[13px] mt-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600 text-[13px]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#1a237e] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 