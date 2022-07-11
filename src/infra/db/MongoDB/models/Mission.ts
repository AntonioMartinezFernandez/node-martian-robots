import { model, Schema, Document } from 'mongoose';

const missionSchema: Schema = new Schema({
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
      type: Array,
    },
    MissionCommands: {
      type: Array,
    },
  },
  output: {
    MissionResult: {
      type: [Array],
    },
  },
});

export const missionModel = model<Document>('Mission', missionSchema);
