const mongoose = require("mongoose");

const taskModelSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    projectName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectModel",
        required: true
    },
    teamName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamModel",
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserOwnerModel",
        required: true
    },
    tags: {
        type: [String]
    },
    timeToComplete: {
        type: Number
    },
    status: {
        type: String,
        enum: ["To Do" , "In Progress" , "Completed" , "Blocked"]
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now
    }
});

taskSchema.pre('save', function (next) {
 this.updatedAt = Date.now();
 next();
});

const Task = mongoose.model("Task", taskModelSchema);
module.exports = Task;