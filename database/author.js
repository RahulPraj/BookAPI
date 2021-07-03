const mongoose = require("mongoose");

//author   schema

const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//ATHOUR MODEL

const AuthorModel = mongoose.model("Authors",AuthorSchema);

module.exports= AuthorMoel;