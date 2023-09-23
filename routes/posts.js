const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await User.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(402).json("You can update only your Post!");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
      const post = await User.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await Post.delete()
          res.status(200).json({message:"Post has been deleted!!"});
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(402).json("You can delete only your Post!");
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  });
//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET ALL POST
router.get("/", async (req, res) => {
    const username = req.query.user;
    const cat = req.query.cat
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        } else if (cat){
            posts = await Post.find({categories:{
                $in:[cat]
            }})
        } else {
            posts=await Post.find()
        }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  });
module.exports = router;
