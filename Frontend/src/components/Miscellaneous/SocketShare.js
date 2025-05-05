import { io } from "socket.io-client"

var socket = io("http://localhost:5500")

export default socket;
