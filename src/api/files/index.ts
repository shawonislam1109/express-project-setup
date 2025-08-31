import { Router } from "express";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  getFiles,
  deleteFile,
  deleteMultipleFiles,
  getFileById,
  downloadFile,
} from "./file.controller";
import upload from "../../middleware/upload";
import authenticate from "../../middleware/authenticate";
import validate from "../../middleware/validate";
import { deleteFileSchema, deleteMultipleFilesSchema } from "./file.validation";

const router = Router();

router.post("/upload", authenticate, upload.single("file"), uploadSingleFile);

// upload multiple files
router.post(
  "/upload-multiple",
  authenticate,
  upload.array("files", 10),
  uploadMultipleFiles
);
router.get("/", authenticate, getFiles);

/**
 * @swagger
 * /api/v1/files:
 *   get:
 *     summary: Get all files
 *     tags: [Files]
 *     responses:
 *       200:
 */
router.delete(
  "/",
  authenticate,
  validate(deleteMultipleFilesSchema.body),
  deleteMultipleFiles
);
router.delete(
  "/:id",
  authenticate,
  validate(deleteFileSchema.params),
  deleteFile
);
router.get("/:id", authenticate, getFileById);
router.get("/:id/download", authenticate, downloadFile);

export default router;
