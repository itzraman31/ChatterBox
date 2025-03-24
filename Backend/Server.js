dotenv.config();
import dotenv from 'dotenv';  
import express from 'express'
import route from './router/router.js'
import connectdb from './database/mongodb.js'
import cors from 'cors'
import router from './router/messageRouter.js'
import cookieParser from 'cookie-parser';
import { app,server } from './Socket/Socket.js';
import Postrouter from './router/postRouters.js'
import userRouter from './router/optRout.js';
import forgetpassroute from './router/forgetpassroute.js';
import Followrouter from './router/followRouter.js';

var corspermission = {
  origin: '*',
  methods: "POST,GET,DELETE,PATCH,PUT,HEAD",
  credentials: true
}

app.use(cors(corspermission))
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", route)
app.use("/api/message", router)
app.use("/api/post", Postrouter)
app.use('/api/user/',userRouter)
app.use('/api/useraction/',Followrouter)
app.use('/api/forget/',forgetpassroute);

connectdb();

const port = 5500
server.listen(port, () => {
  console.log(`I am listening on port ${port}`)
})