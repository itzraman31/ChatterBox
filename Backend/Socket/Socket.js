import express from 'express'
import { Server } from 'socket.io';
import http from 'http'
import { commentOnPost, deletePost, likePost } from '../controller/postCont.js';
import { saveNotificationToDB } from '../controller/notificationCont.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const onlineusers = {};
const onlineusers1 = {};

const getReceiverSocketId = (ReceiverId) => {
    return onlineusers1[ReceiverId];
}

try {
    io.on('connection', (client) => {

        var data = [];

        client.on('userid', (id) => {
            data = id;
            onlineusers[client.id] = id;
            onlineusers1[id] = client.id;
            io.emit('allonlineusers', onlineusers);
        });

        client.on("newcomment", async (comment) => {
            await commentOnPost(comment)
        })

        client.on("likeCount", async (data) => {
            await likePost(data)
        })

        client.on("deletepost", async (id) => {
            await deletePost(id)
        })

        client.on('disconnect', () => {
            delete onlineusers[client.id];
            delete onlineusers1[data];
            io.emit('allonlineusers', onlineusers);
        })
        
        client.on("notification", async (data) => {
            const result=await saveNotificationToDB(data);
            const receiversocket = await getReceiverSocketId(data.receiverId);
            io.to(receiversocket).emit('sendNotification', result);
        })

        io.emit('allonlineusers', onlineusers);
    })

}
catch (error) {
    console.log(error)
}
export { app, io, server, getReceiverSocketId, onlineusers }