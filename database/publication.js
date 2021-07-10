const mongoose = require("mongoose");

//Publication schema

const PublicationSchema = mongoose.Schema({
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

//publication Model

const PublicationModel = mongoose.model("Publications",PublicationSchema);

module.exports= PublicationModel;