import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/authentication';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      const { user, token } = data;

      login(user, token);
      toast.success('Logged in successfully! 🎉')
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };


  return (
    <div className="min-h-[100dvh] bg-[#0B0E14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#131824] border border-[#2A314A] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-100">Welcome Back</h2>
        <p className="text-center text-gray-300 mb-6">Sign in to your account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border bg-[#0B0E14] border-[#2A314A] text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-[#7C7CFF]"
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                📧
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 py-2 w-full border bg-[#0B0E14] border-[#2A314A] text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-[#7C7CFF]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C7CFF] hover:bg-[#6A6AF5] text-white font-semibold py-2 rounded transition duration-200 cursor-pointer cursor-target"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <hr className="flex-grow border-[#2A314A]" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-[#2A314A]" />
        </div>
        <GoogleButton text="Sign in with Google" clickHandler={handleGoogleSignIn} />
        <div className="text-center mt-6 text-sm text-gray-200">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#7C7CFF] hover:underline">
            Sign up
          </Link>
        </div>

        <div className="text-center mt-2">
          <a href="/forgot-password" className="text-sm text-[#7C7CFF] hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
