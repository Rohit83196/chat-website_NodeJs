const socket = io("http://localhost:8000");

const form = document.getElementById("ssend-ccontainer");
console.log(form);
const messageInput = document.getElementById("messageImp");
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3')


const append =(message,position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText =message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === "left") {
        
        audio.play();
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit('send', message);
    messageInput.value = "";
})

const name = prompt("enter your name to join");
socket.emit("new-user-joined",name);

socket.on("user-joined",name=>{
    append(`${name} joined the chat`,"right")
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,"left")
})

socket.on('leaved',name=>{
    append(`${name} left our chat`,"left")
})



// form.addEventListener("send",(e)=>{
//     e.preventDefault();
//     console.log("rohit verma ji");
//     const message = messageInput.value;
//     console.log(message);
//     append(`you ${message}`,"right");
//     // socket.emit("send",message);
//     messageInput.value="";
// })

// let kk = "huii";
// socket.emit("new-user-joined","kk");

// socket.on("receive",data=>{
//     append(`${data.name}:${data.message}`,"left")
// });





















// socket.emit("connection",name)

// console.log(socket);
// console.log(socket.emit());
// socket.emit()