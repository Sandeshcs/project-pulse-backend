const mongoose = require("mongoose");

const userOwnerModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const UserOwner = mongoose.model("UserOwner", userOwnerModelSchema);

module.exports = UserOwner;