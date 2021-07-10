const mongoose= require("mongoose");
//creating book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 15,
    },
    title: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 15,
    },
    pubDate: String,
    language: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 6,
    },
    numPage: Number,
    authors:{
        type: [Number],
        required: true,
        
    }, /*we specifing id of the other as a number not a name*/
    publication: {
        type: Number,
        required: true,
       
    },   /*one book have multiple publication*/
    category: {
        type: [String],
        required: true,
        minLength: 6,
        maxLength: 10,
    },     
});

//create a book model.

const BookModel = mongoose.model("Books", BookSchema);

//EXPORT THE FILE MODEL

module.exports = BookModel;