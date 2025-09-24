const nodemailer = require("nodemailer");
const jwtToken = require("../utils/token");

// Setup your email transporter with environment variables
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other service provider
  auth: {
    user: process.env.EMAIL_USER, // Use the email from .env
    pass: process.env.EMAIL_PASS, // Use the email password from .env
  },
});

// Function to send invite email
async function sendInviteEmail(userId, userEmail) {
  try {
    const token = jwtToken.generateToken({ userId }, undefined, false);

    // Construct the invite link using the base URL from .env
    const inviteLink = `${process.env.FRONTEND_BASE_URL}/reset-password/${token.accessToken}`;

    // Get the current date and time
    const expiresAt = new Date();

    // Add 1 hour to the current time
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Store the token and expiration date in the user record
    await prisma.users.update({
      where: { id: userId },
      data: {
        reset_token: token.accessToken,
        reset_token_expires_at: expiresAt,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use the email from .env
      to: userEmail,
      subject: "Invitation to Reset Password",
      text: `Click on the following link to reset your password: ${inviteLink}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Invite email sent");
  } catch (err) {
    console.error("Error sending invite email", err);
    throw new Error("Failed to send invite email");
  }
}

module.exports = sendInviteEmail;
