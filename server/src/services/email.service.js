import nodemailer from "nodemailer";

// 1. Transporter Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper function to send email
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: `"BookVerse Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

// ==========================================
// EMAIL TEMPLATES & TRIGGER FUNCTIONS
// ==========================================

// 1. Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const subject = "Welcome to BookVerse! 🎉";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Hello ${name}, Welcome to BookVerse!</h2>
      <p>We are thrilled to have you on board. Explore thousands of high-quality eBooks, manage your library, and track your reading progress all in one place.</p>
      <p>Happy Reading!</p>
      <p>Best Regards,<br/>The BookVerse Team</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

// 2. Email Verification (OTP or Link)
export const sendVerificationEmail = async (email, verificationToken) => {
  const subject = "Verify your BookVerse Account";
  // Assuming frontend URL is stored in env
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Verify Your Email</h2>
      <p>Thank you for registering. Please click the button below to verify your email address and activate your account.</p>
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

// 3. Password Reset Email
export const sendPasswordResetEmail = async (email, resetToken) => {
  const subject = "BookVerse - Password Reset Request";
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Reset Your Password</h2>
      <p>We received a request to reset your password. Click the button below to choose a new password:</p>
      <a href="${resetUrl}" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>This link is only valid for 15 minutes.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

// 4. Order / Purchase Confirmation Email
// Digital products ke case mein Purchase aur Order confirmation same ho sakta hai
export const sendOrderConfirmationEmail = async (email, name, order) => {
  const subject = `Order Confirmation - Receipt #${order._id}`;

  // Generating item list dynamically
  let itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.book.title || "eBook"}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
    </tr>
  `,
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #4CAF50;">Purchase Successful!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for your purchase. Your payment of <strong>₹${order.totalAmount}</strong> has been successfully processed.</p>
      
      <h3>Order Details (ID: ${order._id})</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; text-align: left;">Item</th>
            <th style="padding: 8px; text-align: left;">Qty</th>
            <th style="padding: 8px; text-align: left;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <p>Your books are now unlocked and available in your <strong>Library</strong>. You can start reading immediately!</p>
      <a href="${process.env.FRONTEND_URL}/library" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to My Library</a>
    </div>
  `;
  await sendEmail(email, subject, html);
};
