
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT Configuration
const JWT_SECRET = "my_jwt_secret_key";
const TOKEN_EXPIRATION = "24h";

// Create JWT Token
const createToken = (userId) => {
  return jwt.sign(
    {
      id: userId.toString(),
    },
    JWT_SECRET,
    {
      expiresIn: TOKEN_EXPIRATION,
    }
  );
};

// ============================================
// REGISTER USER
// ============================================

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  // Validate password
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    // Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Register user error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ============================================
// LOGIN USER
// ============================================

export async function loginUser(req, res) {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both fields are required",
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login user error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ============================================
// GET CURRENT LOGGED-IN USER
// ============================================

export async function getCurrentUser(req, res) {
  try {
    // authMiddleware attaches the authenticated user to req.user
    const userId = req.user._id || req.user.id;

    const user = await User.findById(userId)
      .select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.error("Get current user error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ============================================
// UPDATE USER PROFILE
// ============================================

export async function updateProfile(req, res) {
  const { name, email } = req.body;

  // Validate fields
  if (!name || !email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid name and email",
    });
  }

  try {
    const userId = req.user._id || req.user.id;

    // Check whether email is already used by another user
    const existingUser = await User.findOne({
      email,
      _id: {
        $ne: userId,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Update profile
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.error("Update profile error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ============================================
// CHANGE USER PASSWORD
// ============================================

export async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  // Validate password fields
  if (
    !currentPassword ||
    !newPassword ||
    newPassword.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Both fields are required and new password must be at least 8 characters long",
    });
  }

  try {
    const userId = req.user._id || req.user.id;

    // Find user with password
    const user = await User.findById(userId)
      .select("password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash and update new password
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    console.error("Update password error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}