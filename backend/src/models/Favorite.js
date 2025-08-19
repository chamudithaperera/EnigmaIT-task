import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    recipeId: { type: String, required: true },
    recipeTitle: { type: String },
    recipeImage: { type: String }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);


