const mongoose = require("mongoose");
require("dotenv").config();

const mongodbUrl = process.env.MONGODB;

const connectToDb = async () => {
    await mongoose
    .connect(mongodbUrl)
    .then(() => console.log("db is connected successfully."))
    .catch((error) => console.log("error while connecting db: ",error))
}

module.exports = {connectToDb};