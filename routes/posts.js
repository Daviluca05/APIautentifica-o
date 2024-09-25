const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para criar um post 
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content, user: req.user.id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar post', error: err.message });
  }
});

// Rota para obter os posts do usuário 
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar posts', error: err.message });
  }
});

module.exports = router;
