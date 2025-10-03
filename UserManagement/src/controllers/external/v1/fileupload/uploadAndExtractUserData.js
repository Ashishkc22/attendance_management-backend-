const Tesseract = require("tesseract.js")
function parseUserData(text) {
  const user = {};
  const lines = text.split("\n");

  lines.forEach((line) => {
    if (line.includes('Name:')) {
      user.name = line.split(':')[1].trim();
    }
    if (line.includes('email:')) {
      user.email = line.split(':')[1].trim();
    }
    if (line.includes('ehone:')) {
      user.phone = line.split(':')[1].trim();
    }
    // Add more parsing logic as needed
  });

  return user;
}
async function uploadAndExtractUserData(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng", {
      logger: (m) => console.log(m), // Optional: To log progress
    });

    console.log("Extracted Text:", text);

    // Now you have the extracted text. You can parse it to extract user information
    const userInfo = parseUserData(text);

    // Here you could insert `userInfo` into a database
    // For example, saving to MongoDB, SQL, etc.

    res.json({ message: "File processed successfully", data: userInfo });
  } catch (error) {
    next(error);
  }
}



module.exports = uploadAndExtractUserData