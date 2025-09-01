import { MulterError } from "multer";

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        statusCode: 400,
        message: `Invalid field name for upload. Please use 'file' for single uploads and 'files' for multiple uploads.`,
      });
    }
    // Handle other potential multer errors here if needed
    return res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  }
  next(err);
};

export default multerErrorHandler;
