//importing mongoose.
const mongoose = require("mongoose");

//using mongoose creating schema. 
const taskModelSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    projectName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    teamName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    teamMember: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        required: true
    }],
    tags: [{
        type: String,
        unique: true
    }],
    timeToComplete: {
        type: Number
    },
    status: {
        type: String,
        enum: ["To Do" , "In Progress" , "Completed" , "Blocked"]
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
        default: "Low"
    },
    dueDate: {
        type: Date
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

//middleware to update date at updatedAt field.
taskModelSchema.pre('save', function (next) {
 this.updatedAt = Date.now();
 next();
});

//model creation.
const Task = mongoose.model("Task", taskModelSchema);

//exporting as module to import and use to do crud op.
module.exports = Task;