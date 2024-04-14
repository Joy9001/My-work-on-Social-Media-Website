// const currentUserId = document.body.dataset.currentUserId;
const handleHtmlGet = (message) => {
    let date = utcToLocal(message.createdAt);
    let msgDate = date.slice(6);
    let msgTime = date.slice(0, 5);

    let dates = document.querySelectorAll(".date");

    if (dates.length === 0 || dates[dates.length - 1].innerText !== msgDate) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        const dateh1 = document.createElement("h1");
        dateh1.innerText = msgDate;

        dateDiv.appendChild(dateh1);
        dayDiv.appendChild(dateDiv);
        msgContainerDiv.appendChild(dayDiv);
    }

    let msg_div = document.createElement("div");
    msg_div.classList.add("to-user-msg");
    msg_div.innerHTML = `
        <p>${message.message}</p>
        <span>${msgTime}</span>
    `;
    msgContainerDiv.appendChild(msg_div);
    chatSection.scrollTop = chatSection.scrollHeight;
};

const handleHtmlOnlineUsers = (users) => {
    const leftPeople = document.querySelectorAll(".people-child");
    leftPeople.forEach((person) => {
        let data = JSON.parse(atob(person.dataset.element));
        let status = person.children[0].children[0];
        let toUserProfile = document.querySelector(".to-user-profile");
        let toUserStatus = toUserProfile.children[0].children[0];

        if (users.includes(data._id)) {
            if(status.classList.contains("hidden")){
                status.classList.remove("hidden");
                toUserStatus.classList.remove("hidden");
            }
        } else {
            if(!status.classList.contains("hidden")){
                status.classList.add("hidden");
                toUserStatus.classList.add("hidden");
            }
        }
    });
};

const socket = io("http://localhost:3000", {
    query: {
        userId: atob(document.body.dataset.currentUserId),
    }
});

socket.on("getOnlineUsers", (users) => {
    console.log("Online users", users);
    handleHtmlOnlineUsers(users);
});

socket.on("newMessage", (message) => {
    console.log("New message", message);
    handleHtmlGet(message);
});

socket.on("connection", () => {
    console.log("Connected to server", socket.id);
})

socket.on("disconnect", () => {
    console.log("Disconnected from server");
    socket.off("newMessage");
})
