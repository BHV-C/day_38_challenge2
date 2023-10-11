// import { io } from 'socket.io-client';
// const socket = io('http://localhost:3000');


// import express from "./node_modules/express";
// import http from "./node_modules/http";
// function createWindow(){
//     const win = newBrowserWindow({
//         window: 1000,
//         height: 700,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//         }
//     })
//     // win.loadfile('index.html');
//     win.loadUrl(url.format({
//         pathname: path.join(__dirname,'index.html'),
//         protocol: 'file',
//         slashes: true
//     }));
// }
// createWindow();
const express = require('express'); // "javascript.validate.enable": false // javascript.suggestionActions.enabled : false
const http = require('http');

const app = express();
const server = http.createServer(app);

const socket = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});


const joinRoomButton = document.getElementById("join-button");
const messageInput = document.getElementById("user-message");
const roomInput = document.getElementById("room-name");
const submit = document.getElementById("submit-button");

// const socket = io("http://localhost:3000");

function submitMessage() {
    const message = messageInput.value;
    const room = roomInput.value;
    
    if (message === "") return ;
    // displayMessage(message);
    // socket.emit('send-chat-message', message);
    console.log(message);
    messageInput.value = "";
}

const name = prompt("What is your name?");

// submit.addEventListener("click", (e) => {
// e.preventDefault();
// // const message = messageInput.value;
// // const room = roomInput.value;

// // if (message === "") return ;
// // // displayMessage(message);
// // console.log(message);
// appendMessage(`You: ${message}`);
// socket.emit('send-chat-message', message);
// // messageInput.value = "";
// submitMessage();
// });
function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

socket.on('chat-message',data => {
    console.log(data);
    appendMessage(`${data.name}: ${data.message}`);
})
socket.on('user-connected',name => {
    console.log(name);
    appendMessage(`${name} connected`);
})