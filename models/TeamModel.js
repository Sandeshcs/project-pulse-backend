const mongoose = require("mongoose");

const teamModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    }
});

const Team = mongoose.model("Team", teamModelSchema);

module.exports = Team;