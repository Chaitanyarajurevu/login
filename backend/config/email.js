import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  // Log configuration status
  console.log('Creating email transporter...')
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Configured' : 'MISSING')
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Configured' : 'MISSING')

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.')
  }

  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    // Add timeout and retry options
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  })
}

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    console.log('Attempting to send OTP email to:', email)
    
    const transporter = createTransporter()

    // Verify transporter before sending
    await transporter.verify()
    console.log('Email transporter verified successfully')

    const mailOptions = {
      from: `InstaClone <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'InstaClone - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #262626;">Password Reset Request</h2>
          <p>You requested to reset your password for InstaClone.</p>
          <p>Your OTP (One-Time Password) is:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dbdbdb;">
          <p style="color: #8e8e8e; font-size: 12px;">InstaClone - Instagram Clone Application</p>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ OTP email sent successfully:', info.messageId)
    console.log('Accepted:', info.accepted)
    console.log('Rejected:', info.rejected)
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Error sending OTP email:', error.message)
    console.error('Error code:', error.code)
    console.error('Full error:', error)
    throw error
  }
}
