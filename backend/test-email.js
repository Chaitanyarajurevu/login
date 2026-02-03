import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const sendTestEmail = async () => {
  try {
    console.log('Creating email transporter...')
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    console.log('Sending test email...')

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'chaitanyarajurevu@gmail.com',
      subject: 'Test Email from InstaClone Backend',
      text: 'This is a test email to verify email functionality is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #262626;">✅ Email Test Successful!</h2>
          <p>This is a test email from your InstaClone backend application.</p>
          <p>If you're reading this, your email configuration is working correctly! 🎉</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dbdbdb;">
          <p style="color: #8e8e8e; font-size: 12px;">
            Sent from: ${process.env.EMAIL_USER}<br>
            Time: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    
    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('Response:', info.response)
    
  } catch (error) {
    console.error('❌ Error sending email:', error.message)
    console.error('Full error:', error)
  }
}

// Run the test
sendTestEmail()
