import mongoose from "mongoose";

import Post from "../models/post.model.js";

// Fetch all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("category subcategory user");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content, category, subcategory, user } = req.body;
        const newPost = new Post({ title, content, category, subcategory, user });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPostsBySubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;

        // Convert to ObjectId (if not already)
        if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
            return res.status(400).json({ message: "Invalid subcategory ID" });
        }

        const posts = await Post.find({ subcategory: subcategoryId }).populate("user category subcategory");

        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this subcategory." });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error while fetching posts." });
    }
};



export const getPostsBySubcategorySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const subcategory = await Subcategory.findOne({ slug });
  
      if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });
  
      const posts = await Post.find({ subcategoryId: subcategory._id });
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  };