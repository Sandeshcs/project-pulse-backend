const mongoose = require("mongoose");

const tagModelSchema = new mongoose.Schema({
    name: [{
        type: String,
        required: true,
        unique: true
    }]
});

const Tag = mongoose.model("Tag", tagModelSchema);

module.exports = Tag;