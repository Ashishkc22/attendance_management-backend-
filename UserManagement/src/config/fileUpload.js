const multer = require('multer');

// Set up multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;