const mongoose = require("mongoose");

//author   schema

const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
       
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15,
    },
    books: {
        type: [String],
        required: true,
        minLength: 6,
        maxLength: 15,
    },
});

//ATHOUR MODEL

const AuthorModel = mongoose.model("Authors", AuthorSchema);

module.exports= AuthorModel;