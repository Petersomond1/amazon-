const globalErrorHandler = (err, req, res, next) => {
    // Check if it's a known operational error (CustomError)
    if (err.isOperational) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        ...(err.data && { data: err.data }), // Include extra data if available
      });
    } else {
      // If it's an unknown or server-side error, return a generic response
      console.error("ERROR 💥:", err); // Log the error (for debugging)
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  export default globalErrorHandler;
  