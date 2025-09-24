const { prisma } = require("../../../config/db"); // Assuming you have a Prisma instance set up
const { verifyToken } = require("../../../utils/token");
const { hashPassword } = require("../../../utils/hash");
const resetPasswordHandler = async (req, res, next) => {
  try {
    // Get the token and new password from the request body
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    // Decode the JWT token to get the user ID
    const decoded = verifyToken(token);

    // Find the user by ID
    const user = await prisma.users.findFirst({
      where: {
        reset_token: token, // assuming the token contains user ID
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Token not found" });
    }

    // Check if the reset token has expired
    const currentDate = new Date();
    if (
      user.reset_token_expires_at &&
      user.reset_token_expires_at < currentDate
    ) {
      return res.status(400).json({ message: "Token has expired" });
    }

    // Hash the new password
    const hashedPassword = hashPassword(newPassword);

    // Update the user's password and clear the reset token
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        reset_token: null, // Clear the reset token after use
        reset_token_expires_at: null, // Clear the expiration date
      },
    });

    return res
      .status(200)
      .json({ message: "Password has been reset successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = resetPasswordHandler;
