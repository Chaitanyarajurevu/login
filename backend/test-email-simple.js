// Simple test to verify email configuration
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

console.log('Testing email configuration...')
console.log('EMAIL_USER:', process.env.EMAIL_USER)
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set (hidden)' : 'NOT SET')

const testEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    // Verify connection
    await transporter.verify()
    console.log('✅ Email configuration is valid!')

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email from InstaClone',
      text: 'If you receive this, email is working!',
      html: '<h1>Email is working!</h1><p>Your OTP feature should work now.</p>'
    })

    console.log('✅ Test email sent successfully!')
    console.log('Message ID:', info.messageId)
  } catch (error) {
    console.error('❌ Email test failed:', error.message)
    console.error('Full error:', error)
  }
}

testEmail()
