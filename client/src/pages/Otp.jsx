import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../utils/authentication';
import { useAuth } from '../context/AuthContext';

const Otp = () => {
  const[otp, setOtp] = useState(['', '', '', '', '', '']);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || " ";

  const handleChange = (index, value)=>{
    if(isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if(value && index < 5){
      document.getElementById(`otp-${index + 1}`).focus();
    }
  }
  const handleKeyDown = (index, e)=>{
    if(e.key === 'Backspace' && !otp[index] && index >0){
      document.getElementById(`otp-${index-1}`).focus();
    }
  }

  const handleSubmit = async ()=>{
    const otpString = otp.join('');
    try {
      const data = await verifyOtp(email, otpString);
      login(data.user, data.token);
      toast.success('OTP Verified Successfully! 🎉');
      navigate('/');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
    }
    setOtp(['', '', '', '', '', '']);
  }
  return (
    <div className='w-screen min-h-[100dvh] flex justify-center items-center p-4'>
      <div className='w-full max-w-[500px] bg-[#131824] border border-[#2A314A] p-8 rounded-lg flex flex-col justify-center items-center gap-6'>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <h1 className='text-2xl sm:text-3xl font-bold'>Verify Your Email</h1>
          <p className='text-gray-400 text-sm sm:text-base'>Enter the OTP sent to your Email: {email}</p>
        </div>
        <div className='flex w-full justify-center items-center gap-4 max-w-full'>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type= 'text'
              value={otp[index]}
              id={`otp-${index}`}
              onChange={(e)=> handleChange(index, e.target.value)}
              onKeyDown={(e)=> handleKeyDown(index, e)}
              maxLength={1}
              className='w-1/6 h-8 sm:w-14 sm:h-14 text-center border border-gray-300 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-[#7C7CFF]'
            />
          ))}
        </div>
        <div className='flex flex-col w-full gap-2 justify-center items-center'>
          <button 
            onClick={handleSubmit}
            className='bg-[#7C7CFF] hover:bg-[#5a5aff] w-full text-white px-4 py-2 max-w-[420px] rounded-md cursor-pointer cursor-target'>Verify</button>
          <div className='flex gap-2'><p className='text-xs sm:text-sm '>Didn't recieve an OTP ?</p> <a className='text-[#7C7CFF] cursor-pointer text-xs sm:text-sm hover:underline'>Resend OTP</a></div>
        </div>

      </div>
    </div>
  )
}

export default Otp