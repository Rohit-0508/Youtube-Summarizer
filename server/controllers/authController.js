const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { generateOtp } = require('../utils/generateOtp');
const { sendEmail } = require('../config/sendGrid');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;

    if (!usernameRegex.test(name)) {
      return res.status(400).json({
        error: 'Invalid username format'
      });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const usernameExists = await User.findOne({ username: name });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = await User.create({
      username: name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    //Send OTP to user's via email
    await sendEmail({
      to: email,
      subject: "Your Signup OTP Code",
      text: `Hello ${name},\n\nYour OTP code is ${otp}.`,
      html: `<p>Hello <strong>${name}</strong>,</p>
             <p>Your OTP code is: <h2>${otp}</h2></p>
             <p>This code is valid for signup verification.</p>`,
    });

    res.status(201).json({ message: "OTP sent to your email", email });

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // res.json({ token, user: { id: newUser._id, name: newUser.username, email: newUser.email } });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    if (user.googleId && !user.password) {
      return res.status(400).json({
        error: 'This account uses Google Sign-In. Please login with Google.'
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    if (!user.isVerified) {

      if (!user.otp || user.otpExpiry < new Date()) {
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendEmail({
          to: email,
          subject: "Your Signup OTP Code",
          text: `Hello ${user.username},\n\nYour OTP code is ${otp}.`,
          html: `<p>Hello <strong>${user.username}</strong>,</p>
             <p>Your OTP code is: <h2>${otp}</h2></p>
             <p>This code is valid for signup verification.</p>`,
        });
      }

      return res.status(403).json({
        error: 'Email not verified',
        isVerified: false,
        email: user.email
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (user.isVerified) {
      return res.status(400).json({ error: 'User already verified' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('OTP verification error:', err.message);
    res.status(500).json({ error: 'Server error during OTP verification' });
  }

}

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If an account with that email exists, a reset link has been sent."
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 15 * 60 * 1000); 

    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = resetExpiry;
    await user.save();

    const resetLink = `https://clipsum.in/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Clipsum Password",
      text: `Hello ${user.username},

Click the link below to reset your password:

${resetLink}

This link will expire in 15 minutes.`,
      html: `
        <p>Hello <strong>${user.username}</strong>,</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" 
           style="display:inline-block;padding:10px 20px;background:#7C7CFF;color:#fff;text-decoration:none;border-radius:5px;">
           Reset Password
        </a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return res.status(200).json({
      message: "If an account with that email exists, a reset link has been sent."
    });

  } catch (err) {
    console.error("Forgot password error:", err.message);
    return res.status(500).json({ error: "Server error during password reset request" });
  }
};

exports.resetPassword = async (req, res)=>{
  const {token, newPassword} = req.body;

  try{
    if(!token || !newPassword){
      return res.status(400).json({error: "Token and new password are required"});
    }
    const user = await User.findOne({passwordResetToken: token});
    if(!user){
      return res.status(400).json({error: "Invalid or expired token"});
    }
    if(user.passwordResetExpiry < new Date()){
      return res.status(400).json({error: "Token expired"});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();
    return res.status(200).json({message: "Password reset successful. Please log in with your new password."});
  }catch(err){
    console.error("Reset Password error:", err.message);
    return res.status(500).json({error: "Server error during password reset"});
  }
}


