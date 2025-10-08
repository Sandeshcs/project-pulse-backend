//This is code used for db connection and sends message to terminal.
const {connectToDb} = require("./db/db.connect");
connectToDb();

//We have imported all schema models to do curd operations.
const Task = require("./models/TaskModel");
const Project = require("./models/ProjectModel");
const Team = require("./models/TeamModel");
const UserOwner = require("./models/UserOwnerModel");
const Tag = require("./models/TagsModel");

//Setting up express.
const express = require("express");
const app = express();
app.use(express.json());

//Setting up cors.
const cors = require("cors");
const corsOrigin = {
    origin: true,
    credentials: true
}
app.use(cors(corsOrigin));

//task model api's.
//post api for task model.
const createNewTask = async (taskDataToCreate) => {
    try{
        const newTaskCreated = new Task(taskDataToCreate);
        const newTaskCreatedIsSaved = await newTaskCreated.save();
        return newTaskCreatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while creating new task: \n${error}`);
        throw error;
    }
}
                
app.post('/tasks', async (req, res) => {
    try{
        const newlyTaskData = await createNewTask(req.body);
        if(newlyTaskData){
            res.status(201).json({
                message: "New task created successfully.",
                data: newlyTaskData
            });
        }else{
            res.status(400).json({
                message: "Error occured new task not created check resourse syntax and values then try again."
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while creating new task.",
            error: error
        });
    }
});

//get all tasks api for task model.
const getAllTasks = async () => {
    try{
        const foundAllTasks = new Task.find();
        return foundAllTasks;
    } 
    catch(error) {
        console.log(`Error occured while getting all tasks: \n${error}`);
        throw error;
    }
}
                
app.get('/tasks', async (req, res) => {
    try{
        const allTasksFound = await getAllTasks();
        if(allTasksFound.length > 0){
            res.status(200).json({
                message: "All tasks found successfully.",
                data: allTasksFound
            });
        }else{
            res.status(404).json({
                message: "Error occured while getting all tasks check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while getting all tasks.",
            error: error
        })
    }
})

//post api to update a task by id for task model.
const updateTaskById = async (taskDataToUpdate, taskToUpdateId) => {
    try{
        const taskUpdated = new Task.findByIdAndUpdate(taskToUpdateId, taskDataToUpdate, {new: true});
        const taskUpdatedIsSaved = await taskUpdated.save();
        return taskUpdatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while updating a task by id: \n${error}`);
        throw error;
    }
}
                
app.post('/tasks/:taskId', async (req, res) => {
    try{
        const updatedTaskData = await updateTaskById(req.body, req.params.taskId);
        if(updatedTaskData){
            res.status(200).json({
                message: "Task updated successfully.",
                data: updatedTaskData
            });
        }else{
            res.status(400).json({
                message: "Error occured while updating a task by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while updating a task by id.",
            error: error
        })
    }
})

//post api for task model.
const deleteTaskById = async (taskToUpdateId) => {
    try{
        const taskDeleted = new Task.findOneAndUpdate(taskToUpdateId);
        return taskDeleted;
    } 
    catch(error) {
        console.log(`Error occured while deleting a task: \n${error}`);
        throw error;
    }
}
                
app.delete('/tasks/:taskId', async (req, res) => {
    try{
        const deletedTaskData = await deleteTaskById(req.params.taskId);
        if(deletedTaskData){
            res.status(200).json({
                message: "Task deleted successfully.",
                data: deletedTaskData
            });
        }else{
            res.status(400).json({
                message: "Error occured while deleting a task by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while deleting a task by id.",
            error: error
        })
    }
})