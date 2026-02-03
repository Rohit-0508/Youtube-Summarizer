import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../utils/authentication';
import { Link } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!/^[a-zA-Z0-9_.]{3,20}$/.test(name)) {
      toast.error('Username can only contain letters, numbers, _ or .');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const data = await registerUser(name, email, password);
      login(data.user, data.token);
      toast.success('Account created successfully! 🎉');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };


  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center pb-2 pt-4 pl-4 pr-4">
      <div className="w-full max-w-md bg-[#131824] border border-[#2A314A] pb-4 px-8 pt-4 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-100">Create Account</h2>
        <p className="text-center text-gray-300 mb-6">Sign up to get started</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="pl-3 pr-3 py-2 w-full border bg-[#0B0E14] border-[#2A314A] text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-[#7C7CFF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-3 pr-3 py-2 w-full border bg-[#0B0E14] border-[#2A314A] text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-[#7C7CFF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-3 pr-10 py-2 w-full border bg-[#0B0E14] border-[#2A314A] text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-[#7C7CFF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-3 pr-10 py-2 w-full border bg-[#0B0E14] border-[#2A314A] text-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-[#7C7CFF]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C7CFF] hover:bg-[#6A6AF5] text-white font-semibold py-2 rounded cursor-pointer"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <hr className="flex-grow border-[#2A314A]" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-[#2A314A]" />
        </div>
        <GoogleButton text="Sign up with Google" clickHandler={handleGoogleSignUp} />

        <div className="mt-2 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-[#7C7CFF] hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
