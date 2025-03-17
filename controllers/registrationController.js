const Registration = require("../models/Registration");
const transporter = require("../config/mailConfig"); // Import the mail config

exports.registerParticipant = async (req, res) => {
    try {
        const { name, age, phone, email, surah } = req.body;

        // Check if the phone number or email already exists
        const existingParticipant = await Registration.findOne({
            $or: [{ phone }, { email }] // Check if phone or email already exists
        });

        if (existingParticipant) {
            return res.status(400).json({ message: "এই ইমেইল বা ফোন নম্বর টি আগে ব্যবহৃত হয়েছে।" });
        }

        // Create a new participant if no duplicates are found
        const newParticipant = new Registration({ name, age, phone, email, surah });
        await newParticipant.save();

        // Send a confirmation email to the participant
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: 'Registration Successful - Quran Competition', // Subject line
           html: `
    <div style="font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #00d2ff, #3a7bd5); padding: 50px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); max-width: 600px; margin: auto; text-align: center;">
    
      <!-- Title Section -->
      <div style="background-color: #ffffff; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); transform: scale(1); animation: scaleUp 0.5s ease-in-out;">
        <h2 style="color: #FF6F61; font-size: 36px; font-weight: bold; letter-spacing: 2px; text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);">🎉 Congratulations, ${name}! 🎉</h2>
        <p style="font-size: 20px; color: #ffffff; background-color: #00c6ff; padding: 10px 20px; border-radius: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
          Your registration for the <strong style="color: #fff;">Quran Competition</strong> was successful! 🌟
        </p>
      </div>
      
      <!-- Details Section -->
      <div style="background-color: #ffffff; padding: 25px; margin-top: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #FF6F61; font-size: 28px; font-weight: bold;">Registration Details</h3>
        <p style="font-size: 18px; color: #333; margin: 10px 0; text-transform: capitalize;">📋 <strong>Name:</strong> ${name}</p>
        <p style="font-size: 18px; color: #333; margin: 10px 0;">🎂 <strong>Age:</strong> ${age}</p>
        <p style="font-size: 18px; color: #333; margin: 10px 0;">📱 <strong>Phone:</strong> ${phone}</p>
        <p style="font-size: 18px; color: #333; margin: 10px 0;">✉️ <strong>Email:</strong> ${email}</p>
        <p style="font-size: 18px; color: #333; margin: 10px 0;">📖 <strong>Surah (if provided):</strong> ${surah || 'N/A'}</p>
      </div>

      <!-- Footer Section -->
      <div style="margin-top: 30px; background-color: #ffffff; padding: 20px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 18px; color: #333; line-height: 1.6; text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);">
          We look forward to your participation! Keep up the great work. 🚀
        </p>
        
        <a href="http://your-dashboard-link.com" style="display: inline-block; background-color: #FF6F61; color: #ffffff; padding: 18px 30px; font-size: 20px; font-weight: bold; text-decoration: none; border-radius: 30px; margin-top: 20px; transition: background-color 0.3s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);">
          Go to Dashboard
        </a>
      </div>

      <!-- Your Image and Personalized Thank You -->
      <div style="margin-top: 50px; text-align: center;">
        <img src="https://pbs.twimg.com/profile_images/1578800825228746752/e7_2-Goa_400x400.jpg" alt="Your Image" style="width: 120px; height: 120px; border-radius: 50%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
        <h4 style="color: #FF6F61; margin-top: 20px;">Thank You,</h4>
        <p style="font-size: 18px; color: #333;">This is your moment to shine! We're excited to have you with us in the Quran Competition. Keep up the hard work, and see you at the event! 🚀</p>
        <p style="font-size: 18px; color: #333; font-weight: bold;">- ${name}</p>
      </div>
    </div>

    <style>
      @keyframes scaleUp {
        0% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }

      /* Mobile Styles */
      @media screen and (max-width: 600px) {
        div {
          padding: 20px;
        }
        h2 {
          font-size: 28px;
        }
        p {
          font-size: 16px;
        }
        a {
          padding: 14px 25px;
        }
      }
    </style>
  `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send response to the client
        res.status(201).json({
            message: "রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে ।",
            participant: newParticipant,
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (unique constraint violation)
            return res.status(400).json({ message: "এই ইমেইল বা ফোন নম্বর টি আগে ব্যবহৃত হয়েছে।" });
        }
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
