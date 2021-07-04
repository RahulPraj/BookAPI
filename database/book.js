const mongoose= require("mongoose");
//creating book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    authors: [Number],   /*we specifing id of the other as a number not a name*/
    publication: Number,   /*one book have multiple publication*/
    category: [String],
});

//create a book model.

const BookModel = mongoose.model("Books", BookSchema);

//EXPORT THE FILE MODEL

module.exports = BookModel;