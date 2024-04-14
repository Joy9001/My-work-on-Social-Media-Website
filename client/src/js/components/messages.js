// const currentUserId = atob(document.body.dataset.currentUserId);
let add_people_popup = document.getElementById("add-people-popup");
let add_people_btn = document.getElementById("add-people-btn");
// let add_people = document.querySelectorAll(".popup-people");
let add_people_list = document.querySelector(".popup-people-all");
let popup_search = document.getElementById("popup-search");
let overlay = document.querySelector("#transparent-overlay");
let msgInput = document.getElementById("msg-input");
let all_people = document.getElementById("people-parent");
let all_people_children = all_people.children;
let all_people_names = document.querySelectorAll(".people_name");
// let all_chats = document.getElementById("all-chats");
let chatSection = document.querySelector(".chat-section");
// let all_chats_children = all_chats.children;
let chat_end = document.getElementById("chats-end");
let chat_head = document.getElementById("chats-head");
let chat_head_name = document.getElementById("chat-head-name");
let chat_head_img = document.getElementById("chat-head-img");
let to_user_info_popup = document.getElementById("to-user-info-popup");
let to_user_info_btn = document.getElementById("to-user-info-btn");
let msgContainerDiv = document.querySelector(".message-container");
// let idx = 0;
let send_btn = document.getElementById("send-btn");
let head_3_children = document.querySelectorAll(".head-3-child");
let emoji_popup = document.getElementById("emoji-popup");

function getTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let time = hours + ":" + minutes;
  return time;
}

const utcToLocal = (utcDate) => {
  const date = new Date(utcDate);

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const day = date.getDate().toString();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day} ${month}, ${year}`;
};

// console.log(utcToLocal("2024-04-08T15:31:44.831Z"));

const handleChatHeadAndEnd = (parsedElement) => {
  chat_end.classList.remove("hidden");
  chat_head.classList.remove("hidden");
  chat_head_name.innerText = parsedElement.fullName;
  chat_head_img.src = parsedElement.profilePic
    ? parsedElement.profilePic
    : `https://avatar.iran.liara.run/username?username=${parsedElement.fullName.replace(" ", "+")}`;
  to_user_info_popup.children[0].children[1].children[0].innerText =
    parsedElement.fullName;
  to_user_info_popup.children[0].children[1].children[1].innerText =
    parsedElement.username;
  to_user_info_popup.children[0].children[0].src = parsedElement.profilePic
    ? parsedElement.profilePic
    : `https://avatar.iran.liara.run/username?username=${parsedElement.fullName.replace(" ", "+")}`;
};

const handleHtmlConversation = (data) => {
  const currentUserId = atob(document.body.dataset.currentUserId);
  // console.log("Data: ", data);
  if (data.messages.length === 0) {
    msgContainerDiv.innerHTML = "";
    return;
  } else {
    // console.log("Creating new conversation", data.messages);
    msgContainerDiv.innerHTML = "";
    let date = "";
    data.messages.forEach((msg) => {
      // console.log("Message: ", msg);
      let msgDate = utcToLocal(msg.createdAt);
      if (msgDate.slice(6) !== date) {
        date = utcToLocal(msg.createdAt).slice(6);
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        const dateh1 = document.createElement("h1");
        dateh1.innerText = date;

        dateDiv.appendChild(dateh1);
        dayDiv.appendChild(dateDiv);
        msgContainerDiv.appendChild(dayDiv);
      }

      if (msg.senderId === currentUserId) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("from-user-msg");
        msgDiv.innerHTML = `
          <p>${msg.message}</p>
          <span>${msgDate.slice(0, 5)}</span>
        `;

        msgContainerDiv.appendChild(msgDiv);
      } else {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("to-user-msg");
        msgDiv.innerHTML = `
          <p>${msg.message}</p>
          <span>${msgDate.slice(0, 5)}</span>
        `;

        msgContainerDiv.appendChild(msgDiv);
      }
    });
    chatSection.scrollTop = chatSection.scrollHeight;
  }
};

const handleConversation = (receiverId) => {
  const currentUserId = atob(document.body.dataset.currentUserId);
  fetch("/get-conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senderId: currentUserId, receiverId }),
  })
    .then((res) => res.json())
    .then((data) => {
      handleHtmlConversation(data);
    });
};

const handleChats = (parsedElement) => {
  let toUserProfileSecImgDiv = document.querySelector(
    ".to-user-profile-sec-img",
  );
  let toUserProfileSecImg = toUserProfileSecImgDiv.children[0];
  toUserProfileSecImg.src = parsedElement.profilePic
    ? parsedElement.profilePic
    : `https://avatar.iran.liara.run/username?username=${parsedElement.fullName.replace(" ", "+")}`;

  let toUserProfileSecNameDiv = document.querySelector(
    ".to-user-profile-sec-name",
  );
  let toUserProfileSecName = toUserProfileSecNameDiv.children[0];
  let toUserProfileSecUsername = toUserProfileSecNameDiv.children[1];
  toUserProfileSecName.innerText = parsedElement.fullName;
  toUserProfileSecUsername.innerText = parsedElement.username;

  let receiverId = parsedElement._id;

  handleConversation(receiverId);
};

const chat_clicked = (htmlElement) => {
  const element = htmlElement.dataset.element;
  const parsedElement = JSON.parse(atob(element));
  // console.log(parsedElement.fullName);

  for (let i = 0; i < all_people_children.length; i++) {
    if (all_people_children[i].classList.contains("active")) {
      all_people_children[i].classList.remove("active");
    }
  }
  // idx = Array.from(all_people_children).indexOf(element);
  handleChatHeadAndEnd(parsedElement);

  htmlElement.classList.add("active");
  if (chatSection.classList.contains("hidden"))
    chatSection.classList.remove("hidden");

  handleChats(parsedElement);
};

function addActive(ele) {
  ele.classList.add("active");
}

overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  add_people_btn.classList.remove("active");
  to_user_info_btn.classList.remove("active");
  add_people_popup.classList.add("hidden");
  to_user_info_popup.classList.add("hidden");
  emoji_popup.classList.add("hidden");
  if (add_people_btn.classList.contains("z-30")) {
    add_people_btn.classList.remove("z-30");
  }
});

add_people_btn.addEventListener("click", (event) => {
  event.stopPropagation();
  // document.body.style.overflow = "hidden";
  add_people_btn.classList.toggle("active");
  add_people_btn.classList.toggle("z-30");

  if (add_people_popup.classList.contains("hidden")) {
    add_people_popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popup_search.focus();
    add_people_list.scrollTop = 0;
  } else {
    add_people_popup.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

const createLeftsidePeople = (data) => {
  let parentDiv = document.createElement("div");
  parentDiv.classList.add("people-child");
  parentDiv.dataset.element = btoa(JSON.stringify(data));
  parentDiv.onclick = () => chat_clicked(parentDiv);

  let imgDiv = document.createElement("div");
  imgDiv.classList.add("chats_img");
  imgDiv.classList.add("indicator");

  let statusDiv = `<span class="indicator-item badge badge-primary h-2 p-[0.4rem] translate-x-[5%] translate-y-[10%] hidden status"></span>`;

  let img = document.createElement("img");
  img.src = data.profilePic
    ? data.profilePic
    : `https://avatar.iran.liara.run/username?username=${data.fullName.replace(" ", "+")}`;
  img.alt = data.fullName;

  imgDiv.innerHTML = statusDiv;
  imgDiv.appendChild(img);
  parentDiv.appendChild(imgDiv);

  let nameDiv = document.createElement("div");
  nameDiv.classList.add("people_name_parent");

  let name = document.createElement("h4");
  name.classList.add("people_name");
  name.innerText = data.fullName;

  nameDiv.appendChild(name);
  parentDiv.appendChild(nameDiv);

  all_people.appendChild(parentDiv);
};

const addPeopleToChat = (event) => {
  const currentUserId = atob(document.body.dataset.currentUserId);
  fetch("/add-people-to-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderId: currentUserId,
      receiverId: event.dataset.id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Added people to chat") {
        createLeftsidePeople(data.newPeople);
        // console.log(data.newPeople);
      }
    })
    .catch((error) => {
      console.log("Error getting people", error);
    });

  overlay.click();
};

// show the added people in the chat

to_user_info_btn.addEventListener("click", () => {
  if (to_user_info_popup.classList.contains("hidden")) {
    to_user_info_popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    to_user_info_btn.classList.add("active");
  } else {
    to_user_info_popup.classList.add("hidden");
    overlay.classList.add("hidden");
    to_user_info_btn.classList.remove("active");
  }
});

const handleHtmlSend = (msgRes) => {
  let date = utcToLocal(msgRes.createdAt);
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
  msg_div.classList.add("from-user-msg");
  msg_div.innerHTML = `
    <p>${msgRes.message}</p>
    <span>${msgTime}</span>
  `;
  msgContainerDiv.appendChild(msg_div);
  chatSection.scrollTop = chatSection.scrollHeight;
};

const handleSendRequest = (receiverId, msg) => {
  const currentUserId = atob(document.body.dataset.currentUserId);
  fetch("/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderId: currentUserId,
      receiverId: receiverId,
      message: msg,
    }),
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      handleHtmlSend(data);
    });
};

send_btn.addEventListener("click", (e) => {
  e.preventDefault();

  let raw_msg = msgInput.value;
  let msg = raw_msg.replace(/\n/g, "<br>");
  msgInput.value = "";
  msgInput.focus();

  if (msg.length > 0) {
    let receiverData = JSON.parse(
      atob(document.querySelector(".people-child.active").dataset.element),
    );
    let receiverId = receiverData._id;
    handleSendRequest(receiverId, msg);
  }
});

msgInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    let raw_msg = msgInput.value;
    let msg = raw_msg.replace(/\n/g, "<br>");
    msgInput.value = "";
    msgInput.focus();

    if (msg.length > 0) {
      let receiverData = JSON.parse(
        atob(document.querySelector(".people-child.active").dataset.element),
      );
      let receiverId = receiverData._id;
      handleSendRequest(receiverId, msg);
    }
  } else if (event.shiftKey && event.key === "Enter") {
    const start = msgInput.selectionStart;
    const end = msgInput.selectionEnd;
    const textBefore = msgInput.value.substring(0, start);
    const textAfter = msgInput.value.substring(end);
    if (textAfter === "") {
      msgInput.value = textBefore + "\n";
    } else {
      msgInput.value = textBefore + "\n" + textAfter;
    }

    msgInput.selectionStart = msgInput.selectionEnd = start;
  }
});
