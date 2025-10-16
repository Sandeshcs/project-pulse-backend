const mongoose = require("mongoose");

const teamMemberModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    teamDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});

const TeamMember = mongoose.model("TeamMember", teamMemberModelSchema);

module.exports = TeamMember;