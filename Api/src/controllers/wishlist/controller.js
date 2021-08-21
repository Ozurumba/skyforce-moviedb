import { WishList } from "../../models/wishlist";
import { error, success } from "../../config/response";

export const addToList = async (req, res) => {
  const {
    title,
    overview,
    release_date,
    vote_count,
    vote_average,
    poster_path,
    backdrop_path,
    original_language,
    original_title,
    popularity,
    video,
    genres,
    userId,
    movieId,
  } = req.body;

  try {
    let movie = [];
    const data =  {
      title,
      overview,
      release_date,
      vote_count,
      vote_average,
      poster_path,
      backdrop_path,
      original_language,
      original_title,
      popularity,
      video,
      genres,
      movieId,
      userId,
    }
    
    const inWishList = await WishList.findOne({ userId, "movie.movieId": { $eq: movieId } });
    if (inWishList) return res.status(400).json(error("You have already added this movie to your wish list", res.statusCode));
    let isUserExists = await WishList.findOne({ userId });
    if (isUserExists) {
      isUserExists.movie.push(data);
      const result = await isUserExists.save();
      return res.json(success("Success", result, res.statusCode));
    } else {
      movie.push(data);
      let item = new WishList();
      item.userId = userId;
      item.movie = movie;

      const result = await item.save();
      return res.json(success("Success", result, res.statusCode));
    } 
  } catch (err) {
    console.log(err);
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const userWishList = async (req, res) => {
  try {
    const wishList = await WishList.find({ userId: req.params.userId });
    return res.json(success("Success", wishList[0], res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Check your network and try again", res.statusCode));
  }
}

export const removeItem = async (req, res) => {
  const { movieId, userId } = req.body;
  try {
    let wishList = await WishList.findOne({ userId });
    if (wishList) {
      const updatedWishListItems = wishList.movie.filter( item => {
        return item.movieId.toString() !== movieId.toString();
      } );
      wishList.movie = updatedWishListItems;
      const updated_wishList = await wishList.save();
      return res.json(success("Success", updated_wishList, res.statusCode));
    } else {
      return res.status(400).json(error("Wish list does not exist", res.statusCode));
    }
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteAll = async (req, res) => {
  try {
    let wishList = await WishList.findOne({ userId: req.params.userId });
    if (!wishList) return res.status(404).json(error("Wish list not found", res.statusCode));
    wishList.movie = [];
    await wishList.save();
    return res.json(success("Deleted wish list", [], res.statusCode));
  } catch (err) {
    console.log(err);
    return res.status(400).json(error("Internal Server Error. Check your network and try again", res.statusCode));
  }
}

