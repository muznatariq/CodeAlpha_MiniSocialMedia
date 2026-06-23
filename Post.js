const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: String,
    likesCount: { type: Number, default: 0 },
    comments: [{ text: String, user: { type: String, default: "Anonymous" } }]
});
module.exports = mongoose.model('Post', postSchema);
