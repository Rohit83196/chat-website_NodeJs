const io = require("socket.io")(8000,{
    cors:{
        origin:'*',
    }
});
// console.log("the io is" ,io);
const users = {};
// console.log(users);
io.on("connection",socket =>{
    // console.log("rohit verma");
    // console.log(socket);
    socket.on("new-user-joined",name=>{
        // console.log(users);
        console.log("new-user",name);

        users[socket.id] = name;
        // console.log(users);

        socket.broadcast.emit("user-joined",name)
    });

    socket.on('send',message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit("leaved",users[socket.id])
        delete users[socket.id]
    });
})
