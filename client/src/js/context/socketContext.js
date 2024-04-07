const socket = io("http://localhost:3000", {
    query: {
        userId: "1234"
    }
});

socket.on("getOnlineUsers", (users) => {
    console.log("Online users", users);
});

socket.on("connection", () => {
    console.log("Connected to server", socket.id);
})

