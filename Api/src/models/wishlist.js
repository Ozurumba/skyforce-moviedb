import mongoose from "mongoose";

const { Schema } = mongoose;


const wishlistSchema = new Schema({
  userId: { type: String },
  movie: [{
    movieId: { type: Number },
    title: { type: String },
    overview: { type: String },
    release_date: { type: Date },
    vote_count: { type: Number },
    vote_average: { type: Number },
    poster_path: { type: String },
    backdrop_path: { type: String },
    original_language: { type: String },
    original_title: { type: String },
    popularity: { type: Number },
    video: { type: Boolean},
    genres: { type: String },
  }]
}, { timestamps: true });

export const WishList = mongoose.model("WishList", wishlistSchema);