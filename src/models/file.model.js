import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    originalName: { type: String, required: true },
    serverFilename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const File = model("File", fileSchema);

export default File;
