'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '@/services/auth';

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('verificationEmail');
    if (!storedEmail) {
      router.push('/signup');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      setError('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyEmail({
        email,
        OTP: otpValue,
      });

      if (response.success) {
        // Clear verification email from storage
        localStorage.removeItem('verificationEmail');
        // Redirect to login
        router.push('/login');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to verify email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    setCountdown(30);
    // Here you would typically call an API endpoint to resend the code
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white justify-center">
      <div className="w-full max-w-[360px] space-y-5 px-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#1a237e] text-center">
            Verify Email
          </h1>
          <p className="text-[13px] text-gray-600 text-center">
            We've sent a verification code to {email}. To complete the verification process, please enter the code here.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-[13px] p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-medium rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent bg-gray-50 placeholder:text-gray-500"
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 bg-[#1a237e] text-white rounded-xl hover:bg-[#283593] transition-colors font-medium text-[13px] ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-[13px] text-gray-600">
            You can request to{' '}
            <button
              onClick={handleResendCode}
              disabled={countdown > 0}
              className={`font-medium ${
                countdown > 0 ? 'text-gray-400' : 'text-[#1a237e] hover:underline'
              }`}
            >
              Resend code
            </button>
            {countdown > 0 && (
              <span className="text-gray-400">
                {' '}in {countdown < 10 ? `0:0${countdown}` : `0:${countdown}`}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 