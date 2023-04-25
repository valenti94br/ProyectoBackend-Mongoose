const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({

    name: String,
    content: String,
    image: String

}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
