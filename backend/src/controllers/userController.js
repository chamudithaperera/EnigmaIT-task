import Favorite from '../models/Favorite.js';

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json({ favorites });
  } catch (err) {
    return next(err);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { recipeId, recipeTitle, recipeImage } = req.body;
    if (!recipeId || !recipeTitle) {
      return res.status(400).json({ message: 'Recipe ID and title are required' });
    }

    const existing = await Favorite.findOne({ userId: req.userId, recipeId });
    if (existing) {
      return res.status(409).json({ message: 'Recipe already in favorites' });
    }

    const favorite = await Favorite.create({
      userId: req.userId,
      recipeId,
      recipeTitle,
      recipeImage
    });

    return res.status(201).json({ favorite });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: 'Recipe already in favorites' });
    }
    return next(err);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const favorite = await Favorite.findOneAndDelete({ userId: req.userId, recipeId });
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    return res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    return next(err);
  }
};
