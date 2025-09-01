// upload file
import File from "../../models/file.model.js";
import fs from "fs";

// upload single file
export const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const { originalname, filename, path, mimetype, size } = req.file;

    const newFile = new File({
      originalName: originalname,
      serverFilename: filename,
      path,
      mimetype,
      size,
    });

    await newFile.save();

    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    next(error);
  }
};

// upload multiple files
export const uploadMultipleFiles = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one file" });
    }

    const uploadedFiles = [];
    for (const file of files) {
      const { originalname, filename, path, mimetype, size } = file;
      const newFile = new File({
        originalName: originalname,
        serverFilename: filename,
        path,
        mimetype,
        size,
      });
      await newFile.save();
      uploadedFiles.push(newFile);
    }

    res
      .status(201)
      .json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (error) {
    next(error);
  }
};

// get all files
export const getFiles = async (req, res, next) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

// delete file by id
export const deleteFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(file.path);
    await file.deleteOne();

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// get file by id
export const getFileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

// download file by id
export const downloadFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = file.path;
    res.download(filePath, file.originalName);
  } catch (error) {
    next(error);
  }
};

// delete multiple files
export const deleteMultipleFiles = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of file IDs to delete." });
    }

    const files = await File.find({ _id: { $in: ids } });

    if (files.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found for the provided IDs." });
    }

    // Delete files from the filesystem
    for (const file of files) {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        console.error(
          `Failed to delete file from filesystem: ${file.path}`,
          err
        );
        // Continue to the next file even if one fails
      }
    }

    // Delete files from the database
    await File.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Files deleted successfully." });
  } catch (error) {
    next(error);
  }
};
