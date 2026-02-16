import React, { useState } from 'react'
import { requestPasswordReset } from '../utils/authentication';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [email, setEmail]= useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState('');


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await requestPasswordReset(email);
            toast.success(res.message || 'If an account with that email exists, a password reset link has been sent!');
        }catch(err){
            console.error(err);
            setError(err.response?.data?.error || 'Failed to request password reset. Please try again.');
        }finally{
            setIsLoading(false);
            setEmail('');
        }
    }

    return (
        <div className="min-h-[100dvh] bg-[#0B0E14] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#131824] border border-[#2A314A] rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-100">Reset Password</h2>
                <p className="text-center text-gray-300 mb-6">Enter your email to reset your password</p>

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

export default ForgotPassword