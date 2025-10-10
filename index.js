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

//Task model api's.
//post api to new task.
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
        const newTaskData = await createNewTask(req.body);
        if(newTaskData){
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

//Get api to fetch all tasks.
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

//Update api to update a task by id.
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

//Delete api to delete a task by id.
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
        });
    }
});

//Project model api's.
//Post api to create new project.
const createNewProject = async (projectDataToCreate) => {
    try{
        const newProjectCreated = new Project(projectDataToCreate);
        const newProjectCreatedIsSaved = await newProjectCreated.save();
        return newProjectCreatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while creating new project: \n${error}`);
        throw error;
    }
}
                
app.post('/projects', async (req, res) => {
    try{
        const newProjectData = await createNewProject(req.body);
        if(newProjectData){
            res.status(201).json({
                message: "New project created successfully.",
                data: newProjectData
            });
        }else{
            res.status(400).json({
                message: "Error occured new project not created check resourse syntax and values then try again."
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while creating new project.",
            error: error
        });
    }
});

//Get api to fetch all projects.
const getAllProjects = async () => {
    try{
        const foundAllProjects = new Project.find();
        return foundAllProjects;
    } 
    catch(error) {
        console.log(`Error occured while getting all projects: \n${error}`);
        throw error;
    }
}
                
app.get('/projects', async (req, res) => {
    try{
        const allProjectsFound = await getAllProjects();
        if(allProjectsFound.length > 0){
            res.status(200).json({
                message: "All projects found successfully.",
                data: allProjectsFound
            });
        }else{
            res.status(404).json({
                message: "Requested data not found."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while getting all Projects.",
            error: error
        })
    }
})

//Update api to update a project by id.
const updateProjectById = async (projectToUpdateId, projectDataToUpdate) => {
    try{
        const projectUpdated = new Project.findByIdAndUpdate(projectToUpdateId, projectDataToUpdate, {new: true});
        const projectUpdatedIsSaved = await projectUpdated.save();
        return projectUpdatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while updating a project by id: \n${error}`);
        throw error;
    }
}
                
app.post('/projects/:projectId', async (req, res) => {
    try{
        const updatedProjectData = await updateProjectById(req.params.projectId, req.body);
        if(updatedProjectData){
            res.status(200).json({
                message: "Project updated successfully.",
                data: updatedProjectData
            });
        }else{
            res.status(400).json({
                message: "Error occured while updating a project by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while updating a project by id.",
            error: error.name
        })
    }
})

//Delete api to delete a project by id.
const deleteProjectById = async (projectIdToUpdate) => {
    try{
        const projectDeleted = new Project.findOneAndUpdate(projectIdToUpdate);
        return projectDeleted;
    } 
    catch(error) {
        console.log(`Error occured while deleting a project: \n${error}`);
        throw error;
    }
}
                
app.delete('/projects/:projectId', async (req, res) => {
    try{
        const deletedProjectData = await deleteProjectById(req.params.projectId);
        if(deletedProjectData){
            res.status(200).json({
                message: "Project deleted successfully.",
                data: deletedProjectData
            });
        }else{
            res.status(400).json({
                message: "Error occured while deleting a project by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while deleting a project by id.",
            error: error.name
        })
    }
})

//Team model api's.
//Post api to create new team.
const createNewTeam = async (teamDataToCreate) => {
    try{
        const newTeamCreated = new Team(teamDataToCreate);
        const newTeamCreatedIsSaved = await newTeamCreated.save();
        return newTeamCreatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while creating new team: \n${error}`);
        throw error;
    }
}
                
app.post('/teams', async (req, res) => {
    try{
        const newTeamData = await createNewTeam(req.body);
        if(newTeamData){
            res.status(201).json({
                message: "New team created successfully.",
                data: newTeamData
            });
        }else{
            res.status(400).json({
                message: "Error occured new Team not created check resourse syntax and values then try again."
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while creating new Team.",
            error: error
        });
    }
});

//Get api to fetch all Teams.
const getAllTeams = async () => {
    try{
        const foundAllTeams = new Team.find();
        return foundAllTeams;
    } 
    catch(error) {
        console.log(`Error occured while getting all Teams: \n${error}`);
        throw error;
    }
}
                
app.get('/teams', async (req, res) => {
    try{
        const allTeamsFound = await getAllTeams();
        if(allTeamsFound.length > 0){
            res.status(200).json({
                message: "All Teams found successfully.",
                data: allTeamsFound
            });
        }else{
            res.status(404).json({
                message: "Requested data not found."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while getting all Teams.",
            error: error
        })
    }
})

//Update api to update a Team by id.
const updateTeamById = async (teamToUpdateId, teamDataToUpdate) => {
    try{
        const teamUpdated = new Team.findByIdAndUpdate(teamToUpdateId, teamDataToUpdate, {new: true});
        const teamUpdatedIsSaved = await teamUpdated.save();
        return teamUpdatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while updating a Team by id: \n${error}`);
        throw error;
    }
}
                
app.post('/teams/:teamId', async (req, res) => {
    try{
        const updatedTeamData = await updateTeamById(req.params.teamId, req.body);
        if(updatedTeamData){
            res.status(200).json({
                message: "Team updated successfully.",
                data: updatedTeamData
            });
        }else{
            res.status(400).json({
                message: "Error occured while updating a Team by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while updating a Team by id.",
            error: error.name
        })
    }
})

//Delete api to delete a Team by id.
const deleteTeamById = async (teamIdToUpdate) => {
    try{
        const teamDeleted = new Team.findOneAndUpdate(teamIdToUpdate);
        return teamDeleted;
    } 
    catch(error) {
        console.log(`Error occured while deleting a Team: \n${error}`);
        throw error;
    }
}
                
app.delete('/teams/:teamId', async (req, res) => {
    try{
        const deletedTeamData = await deleteTeamById(req.params.teamId);
        if(deletedTeamData){
            res.status(200).json({
                message: "Team deleted successfully.",
                data: deletedTeamData
            });
        }else{
            res.status(400).json({
                message: "Error occured while deleting a Team by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while deleting a Team by id.",
            error: error.name
        })
    }
})

//User model api's.
//Post api to create new member.
const createNewMember = async (memberDataToCreate) => {
    try{
        const newMemberCreated = new UserOwner(memberDataToCreate);
        const newMemberIsSaved = await newMemberCreated.save();
        return newMemberIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while creating new member: \n${error}`);
        throw error;
    }
}
                
app.post('/members', async (req, res) => {
    try{
        const newMemberData = await createNewMember(req.body);
        if(newMemberData){
            res.status(201).json({
                message: "New member created successfully.",
                data: newMemberData
            });
        }else{
            res.status(400).json({
                message: "Error occured new member not created check resourse syntax and values then try again."
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while creating new member.",
            error: error
        });
    }
});

//Get api to fetch all members.
const getAllMembers = async () => {
    try{
        const foundAllMembers = new UserOwner.find();
        return foundAllMembers;
    } 
    catch(error) {
        console.log(`Error occured while getting all members: \n${error}`);
        throw error;
    }
}
                
app.get('/members', async (req, res) => {
    try{
        const allMembersFound = await getAllMembers();
        if(allMembersFound.length > 0){
            res.status(200).json({
                message: "All members found successfully.",
                data: allMembersFound
            });
        }else{
            res.status(404).json({
                message: "Requested data not found."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while getting all members.",
            error: error
        })
    }
})

//Update api to update a member by id.
const updateMemberById = async (memberToUpdateId, memberDataToUpdate) => {
    try{
        const memberUpdated = new UserOwner.findByIdAndUpdate(memberToUpdateId, memberDataToUpdate, {new: true});
        const memberUpdatedIsSaved = await memberUpdated.save();
        return memberUpdatedIsSaved;
    } 
    catch(error) {
        console.log(`Error occured while updating a member by id: \n${error}`);
        throw error;
    }
}
                
app.post('/members/:memberId', async (req, res) => {
    try{
        const updatedMemberData = await updateMemberById(req.params.memberId, req.body);
        if(updatedMemberData){
            res.status(200).json({
                message: "member updated successfully.",
                data: updatedMemberData
            });
        }else{
            res.status(400).json({
                message: "Error occured while updating a member by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while updating a member by id.",
            error: error.name
        })
    }
})

//Delete api to delete a member by id.
const deleteMemberById = async (memberIdToUpdate) => {
    try{
        const memberDeleted = new UserOwner.findOneAndUpdate(memberIdToUpdate);
        return memberDeleted;
    } 
    catch(error) {
        console.log(`Error occured while deleting a member: \n${error}`);
        throw error;
    }
}
                
app.delete('/members/:memberId', async (req, res) => {
    try{
        const deletedMemberData = await deleteMemberById(req.params.memberId);
        if(deletedMemberData){
            res.status(200).json({
                message: "member deleted successfully.",
                data: deletedMemberData
            });
        }else{
            res.status(400).json({
                message: "Error occured while deleting a member by id check resourse syntax and values then try again."
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error while deleting a member by id.",
            error: error.name
        })
    }
})