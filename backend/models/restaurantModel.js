import mongoose, { Schema } from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    coordinates: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
