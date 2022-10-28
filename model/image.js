const Mongoose = require("mongoose");


const imageSchema = new Mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }

});

module.exports = new Mongoose.model("Image", imageSchema);

