import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { resetPassword } from '../utils/authentication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = new URLSearchParams(window.location.search).get('token');

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }
        try{
            const res = await resetPassword(token, formData.password);
            toast.success(res.message || 'Password reset successful! Please log in with your new password.');
        }catch(err){
            console.error(err);
            toast.error(err.response?.data?.error || 'Failed to reset password. Please try again.');
        }finally{
            setIsLoading(false);
            setFormData({ password: '', confirmPassword: '' });
        }
    }

    return (
        <div className="min-h-[100dvh] bg-[#0B0E14] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#131824] border border-[#2A314A] rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-100">Reset Password</h2>
                <p className="text-center text-gray-300 mb-6">Enter your new password below</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                        Submit
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword