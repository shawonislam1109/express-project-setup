
import { Schema, model, Document } from 'mongoose';

export interface IFile extends Document {
  originalName: string;
  serverFilename: string;
  path: string;
  mimetype: string;
  size: number;
}

const fileSchema = new Schema<IFile>({
  originalName: { type: String, required: true },
  serverFilename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
}, { timestamps: true });

const File = model<IFile>('File', fileSchema);

export default File;
