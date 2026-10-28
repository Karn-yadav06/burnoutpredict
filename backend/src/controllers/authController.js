import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'burnout_predict_super_secret_key_129847192847';
const JWT_EXPIRES_IN = '7d';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'hr_manager'
    });

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userObj = newUser.toJSON();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: userObj
    });
  } catch (error) {
    console.error('Error in user registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration.'
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userObj = user.toJSON();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: userObj
    });
  } catch (error) {
    console.error('Error in user login:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login.'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const userObj = user.toJSON();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      user: userObj
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching user profile.'
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User with this email does not exist.'
      });
    }

    // In a real application, we would send an email here.
    // For now, we will generate a short-lived token and return it in the response for testing/demo.
    const resetToken = jwt.sign(
      { id: user.id },
      JWT_SECRET + user.password, // secret is tied to the current password
      { expiresIn: '15m' }
    );

    const resetLink = `http://localhost:3000/reset-password/${user.id}/${resetToken}`;

    return res.status(200).json({
      success: true,
      message: 'Password reset link generated successfully.',
      resetLink,
      resetToken,
      userId: user.id
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during forgot password.'
    });
  }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired password reset token.'
      });
    }

    const secret = JWT_SECRET + user.password;
    try {
      jwt.verify(token, secret);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully.'
    });
  } catch (error) {
    console.error('Error in reset password:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during password reset.'
    });
  }
};
