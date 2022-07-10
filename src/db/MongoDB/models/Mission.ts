import { model, Schema, Document } from 'mongoose';

const userSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  input: {
    FieldSurface: {
      type: [Number],
    },
    MissionCommands: {
      type: [String],
    },
  },
  output: {
    MissionResult: {
      type: [[String]],
    },
  },
});

export const userModel = model<Document>('User', userSchema);
