import mongoose from 'mongoose';

import {
  MONGODB_SERVER,
  MONGODB_PORT,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DBNAME,
} from '@config/environment';

export const mongodbConnect = async () => {
  await mongoose.connect(
    `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_SERVER}:${MONGODB_PORT}/${MONGODB_DBNAME}`,
  );
};
