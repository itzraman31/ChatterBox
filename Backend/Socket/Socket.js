import express from 'express'
import { Server } from 'socket.io';
import http from 'http'

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
        var data=[];
        client.on('userid', (id) => {
            data=id;
            onlineusers[client.id] = id;
            onlineusers1[id] = client.id;
            io.emit('allonlineusers', onlineusers);
        });
        client.on('disconnect', () => {
            delete onlineusers[client.id];
            delete onlineusers1[data];
            io.emit('allonlineusers', onlineusers);
        })
        
        io.emit('allonlineusers', onlineusers);
    })

}
catch (error) {
    console.log(error)
}
export { app, io, server, getReceiverSocketId,onlineusers }