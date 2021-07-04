const mongoose = require("mongoose");

//Publication schema

const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//publication Model

const PublicationModel = mongoose.model("Publications",PublicationSchema);

module.exports= PublicationModel;