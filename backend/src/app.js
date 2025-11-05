import express from 'express';
import {createServer} from 'node:http';
 import { connectToSocket } from './controllers/socketmanager.js';
import mongoose from 'mongoose';
import cors from 'cors';    
import userRoutes from './routes/userroutes.js';
import { connect } from 'node:http2';

const app = express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000));

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);
// app.use("/api/v2/users",newUserRoutes);

const start= async()=>{
app.set("mongo_user")
const connection=await mongoose.connect("mongodb+srv://me:Pra04%40Vk@cluster0.lkhseik.mongodb.net/")
console.log("MongoDB connected ");
    server.listen(app.get("port") ,() => {
        console.log("Server is running on port 8000");
    });
};
    start();