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
    },
    teamName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamModel"
    }
});

const UserOwner = mongoose.model("UserOwner", userOwnerModelSchema);

module.exports = UserOwner;