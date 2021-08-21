import error from "../config/error";
import wishlistRoutes from "../controllers/wishlist/router";

export default (app) => {
  app.use("/api/v1", wishlistRoutes);
  app.use(error);
}