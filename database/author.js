const mongoose = require("mongoose");

//author   schema

const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//ATHOUR MODEL

const AuthorMoel = mongoose.model(AuthorSchema);

module.exports= AuthorMoel;