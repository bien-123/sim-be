import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_CONNECTION_STRING } from '../includes/config';

export default class MongoProvider {
  static async connect(options?: ConnectOptions) {
    await mongoose.connect(MONGO_CONNECTION_STRING, options);
  }
}