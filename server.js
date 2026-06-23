const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Models
const User = require('./User.js');
const Post = require('./Post.js');

// Database Connection
 //due to security reason link is not availabe here.

mongoose.connect(dbURI)
  .then(() => {
      console.log('Database connected successfully!');
      app.listen(PORT, () => {
          console.log(`Server running at http://localhost:${PORT}`);
      });
  })
  .catch((err) => {
      console.error('Database connection error:', err);
  });

// Routes
app.get('/get-posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/create-post', async (req, res) => {
    try {
        const newPost = new Post({ content: req.body.content });
        await newPost.save();
        res.send('Success');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/like/:id', async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, { $inc: { likesCount: 1 } });
        res.send('Liked');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/comment/:id', async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, { 
            $push: { comments: { text: req.body.text } } 
        });
        res.send('Commented');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/follow/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $addToSet: { followers: req.body.currentUserId }
        });
        res.send('Followed');
    } catch (err) {
        res.status(500).send(err);
    }
});
