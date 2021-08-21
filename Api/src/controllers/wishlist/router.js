import express from "express";
import { addToList, checkProductInWishList, deleteAll, removeItem, userWishList } from "./controller";

const router = express.Router();

router.post("/wishlist/add", addToList);
router.get("/wishlist/:userId", userWishList);
router.put("/wishlist/empty/:userId", deleteAll);
router.put("/wishlist/removeitem", removeItem);

export default router;