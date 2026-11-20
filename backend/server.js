const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const smsRoutes = require('./routes/smsRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://...';
mongoose.connect(MONGO_URI)
  .then(() => console.log('🔥 MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ DB Connection Error:', err.message));

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Store OTP temporarily in memory for secure verification
const otpStorage = {};

// 🚀 Valid 20 Promo Codes for 7-Day Free Trial (SSR2026-1 to SSR2026-20)
const VALID_PROMO_CODES = Array.from({ length: 20 }, (_, i) => `SSR2026-${i + 1}`);

// Updated Restaurant Schema with Trial & Subscription Support
const RestaurantSchema = new mongoose.Schema({
  name: String,
  shopName: String,
  email: String,
  phone: String,
  password: String,
  plan: { type: String, default: 'Starter' },
  is_active: { type: Boolean, default: true },
  hasSelectedPlan: { type: Boolean, default: false },
  isTrial: { type: Boolean, default: false },
  trialExpireDate: { type: Date, default: null }
});
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

const ComplaintSchema = new mongoose.Schema({
  shopName: String,
  name: String,
  phone: String,
  email: String,
  subject: String,
  description: String,
  date: String
});
const Complaint = mongoose.model('Complaint', ComplaintSchema);

// 🚀 Text.lk SMS Routes (/api/sms/bill & /api/sms/broadcast)
app.use('/api/sms', smsRoutes);

// 🚀 1. Register API Route (Nodemailer 6-Digit OTP, Promo Code & Trial Support)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, promoCode, plan, shopName, phone } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please fill all required fields!' });
    }

    // Check if restaurant already exists
    const existingUser = await Restaurant.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered!' });
    }

    // Check if valid promo code is provided for 7-day trial
    const isTrialPromo = promoCode && (VALID_PROMO_CODES.includes(promoCode.toUpperCase()) || promoCode.toUpperCase() === 'SSR2026' || promoCode.toUpperCase().startsWith('SSR-PROMO'));

    const newResto = new Restaurant({
      name,
      shopName: shopName || "My Restaurant",
      email,
      phone: phone || "0712345678",
      password,
      plan: isTrialPromo ? '7-Day Trial' : (plan || 'Starter'),
      is_active: true,
      hasSelectedPlan: isTrialPromo ? true : false, // Skip subscription plans if trial promo used!
      isTrial: isTrialPromo ? true : false,
      trialExpireDate: isTrialPromo ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null
    });

    await newResto.save();

    // Generate 6-digit random OTP for verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage[email] = otp;

    // Send Welcome / OTP Email via Nodemailer
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to SSR Resto POS - Verify Your Account',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #fff; border-radius: 10px;">
            <h2 style="color: #f97316;">Welcome to SSR Cloud POS!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for registering with SSR Cloud POS Platform. Your verification code is:</p>
            <h1 style="background: #1e293b; color: #f97316; padding: 10px 20px; display: inline-block; border-radius: 8px; letter-spacing: 5px;">${otp}</h1>
            ${isTrialPromo ? '<p style="color: #10b981; font-weight: bold;">🎁 7-Day Free Trial Promo Code Applied Successfully!</p>' : ''}
            <p>Please enter this code in the verification screen to proceed.</p>
            <p>Best Regards,<br>SSR Team</p>
          </div>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email send error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Registration successful and verification email triggered!',
      isTrial: isTrialPromo,
      hasSelectedPlan: isTrialPromo
    });
  } catch (err) {
    console.error('Registration API Error:', err);
    res.status(500).json({ success: false, error: 'Internal server error during registration.' });
  }
});

// 🚀 2. Verify OTP API Route
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required!' });
    }

    if (otpStorage[email] && otpStorage[email] === otp) {
      delete otpStorage[email]; // clear OTP after successful verification
      
      const resto = await Restaurant.findOne({ email });

      return res.status(200).json({ 
        success: true, 
        message: 'Email verified successfully!',
        token: 'ssr-token-secured-999',
        hasSelectedPlan: resto ? resto.hasSelectedPlan : false,
        isTrial: resto ? resto.isTrial : false
      });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid or expired verification code!' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 3. Clear All Data API Route (GET method for easy browser access)
app.get('/api/admin/clear-all-data', async (req, res) => {
  try {
    await Restaurant.deleteMany({});
    await Complaint.deleteMany({});
    res.status(200).send('<h1 style="color: #22c55e; font-family: Arial; text-align: center; margin-top: 50px;">🔥 All restaurants and complaints cleared successfully! You can now test fresh.</h1>');
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 4. Admin Restaurants Route
app.get('/api/admin/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({ success: true, data: restaurants });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 5. Admin Financial Stats Route
app.get('/api/admin/financial-stats', async (req, res) => {
  try {
    const totalRestaurants = await Restaurant.countDocuments({});
    const activeSubscriptions = await Restaurant.countDocuments({ is_active: true });
    res.status(200).json({
      success: true,
      stats: {
        totalRestaurants,
        activeSubscriptions,
        totalRevenue: totalRestaurants * 5000
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 6. Admin Complaints / Support Tickets Routes
app.get('/api/admin/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find({}).sort({ _id: -1 });
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/complaints', async (req, res) => {
  try {
    const { shopName, name, phone, email, subject, description, date } = req.body;
    const newComplaint = new Complaint({ shopName, name, phone, email, subject, description, date });
    await newComplaint.save();
    res.status(200).json({ success: true, message: 'Complaint saved successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 7. Restaurant Status Update Route (Block/Unblock)
app.patch('/api/admin/restaurants/:id/status', async (req, res) => {
  try {
    const resto = await Restaurant.findById(req.params.id);
    if (!resto) return res.status(404).json({ success: false, error: 'Restaurant not found' });
    
    resto.is_active = resto.is_active === false ? true : false;
    await resto.save();
    res.status(200).json({ success: true, is_active: resto.is_active });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => res.send('SSR Resto POS Backend is running smoothly with 7-Day Trial Support!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));