function handleErrorResponse(err, req, res, next) {
  try {
    if (res.headersSent) {
      return next(err);
    }
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = handleErrorResponse;
