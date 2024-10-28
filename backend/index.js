import express from "express";
import {PORT, MongoDBURL} from './config.js';
import mongoose from "mongoose";
import taskRoute from "./routes/taskRoute.js";
import cors from 'cors';

const app = express();
app.use(express.json());

mongoose.connect(MongoDBURL)
.then(()=>{
    console.log("App Connected to Database");
    app.listen(PORT, () => {
        console.log(`app listening at ${PORT}`);
    });
})
.catch(()=>{
    console.log("App couldn't connect to Database");
})

app.use("/api/Tasks", taskRoute)
app.use(cors());

app.get('/', async(req, res) => {
    console.log(req);
    res.status(234).send("Hello")
})