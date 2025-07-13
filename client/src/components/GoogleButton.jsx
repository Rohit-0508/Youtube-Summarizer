import React, { useState } from 'react';
import btn from '../assets/google-btn.svg';

const GoogleButton = ({ text = "Sign in with Google", clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className="w-full cursor-pointer flex items-center justify-center gap-2 mt-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 transition duration-200 text-sm font-medium text-gray-700"
    >
      <img
        src={btn}
        alt="Google logo"
        className="w-5 h-5"
      />
      {text}
    </button>
  );
};

export default GoogleButton;
