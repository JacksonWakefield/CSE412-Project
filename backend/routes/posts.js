import express from "express";
import { getRecFriends, getTopUsers, addLike, getLikes, makeAlbum, makePost, getPosts, getComments, getPicByID, makeComment, addTag, getFriends, addFriend, deletePhoto, deleteAlbum, getPopularTags } from "../controllers/posts.js";
const router = express.Router();

router.post("/makeAlbum", makeAlbum);
router.post("/makePost", makePost);
router.post("/getPosts", getPosts);
router.post("/getComments", getComments);
router.post("/getPicByID", getPicByID);
router.post("/makeComment", makeComment);
router.post("/addTag", addTag);

router.post("/getFriends", getFriends);
router.post("/addFriend", addFriend);
router.post("/deletePhoto", deletePhoto);
router.post("/deleteAlbum", deleteAlbum);
router.post("/getPopularTags", getPopularTags);
router.post("/addLike", addLike);
router.post("/getLikes", getLikes);
router.post("/getTopUsers", getTopUsers);
router.post("/getRecFriends", getRecFriends)

export default router;