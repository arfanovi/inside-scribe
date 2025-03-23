import express from "express";
import { getPosts, createPost, getPostsBySubcategory, getPostsBySubcategorySlug } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/subcategory/:id/posts", getPostsBySubcategory); // 
router.get("/subcategory/:slug/posts", getPostsBySubcategorySlug);


export default router;
