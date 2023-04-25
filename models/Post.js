const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

name: String,

content: String,

image: String

}, { timestamps: true });

const Post = mongoose.model('Product', ProductSchema);

module.exports = Post;