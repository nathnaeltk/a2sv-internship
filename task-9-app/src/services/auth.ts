const BASE_URL = 'https://akil-backend.onrender.com';

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface VerifyEmailData {
  email: string;
  OTP: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function signUp(data: SignUpData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to sign up');
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Something went wrong',
    };
  }
}

export async function verifyEmail(data: VerifyEmailData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${BASE_URL}/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to verify email');
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Something went wrong',
    };
  }
}

export async function signIn(data: SignInData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to sign in');
    }

    // Store the token if it exists in the response
    if (result.data?.token) {
      localStorage.setItem('token', result.data.token);
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Something went wrong',
    };
  }
} 