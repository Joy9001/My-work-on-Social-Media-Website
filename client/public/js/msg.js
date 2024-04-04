let add_people_popup = document.getElementById("add-people-popup");
let add_people_btn = document.getElementById("add-people-btn");
let add_people_list = document.querySelector(".popup-people-all");
let popup_search = document.getElementById("popup-search");
let overlay = document.querySelector("#transparent-overlay");
let msg_input = document.getElementById("msg-input");
let all_people = document.getElementById("people-parent");
let all_people_children = all_people.children;
let all_people_names = document.querySelectorAll(".people_name");
let all_chats = document.getElementById("all-chats");
let all_chats_children = all_chats.children;
let chat_end = document.getElementById("chats-end");
let chat_head = document.getElementById("chats-head");
let chat_head_name = document.getElementById("chat-head-name");
let to_user_info_popup = document.getElementById("to-user-info-popup");
let to_user_info_btn = document.getElementById("to-user-info-btn");
let idx = 0;
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

function chat_clicked(element) {
  for (let i = 0; i < all_people_children.length; i++) {
    if (all_people_children[i].classList.contains("active")) {
      all_people_children[i].classList.remove("active");
    }
  }

  idx = Array.from(all_people_children).indexOf(element);

  chat_end.classList.remove("hidden");
  chat_head.classList.remove("hidden");
  chat_head_name.innerText = all_people_names[idx].innerText;
  console.log(to_user_info_popup.children[0]);
  to_user_info_popup.children[0].children[1].children[0].innerText = all_people_names[idx].innerText;
  to_user_info_popup.children[0].children[1].children[1].innerText = `@${all_people_names[idx].innerText}123`;

  element.classList.add("active");

  for (let i = 0; i < all_chats_children.length; i++) {
    if (!all_chats_children[i].classList.contains("hidden")) {
      all_chats_children[i].classList.add("hidden");
    }
  }

  all_chats_children[idx].classList.remove("hidden");
  all_chats_children[idx].scrollTop = all_chats_children[idx].scrollHeight;
}

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
  // event.stopPropagation();
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

send_btn.addEventListener("click", (e) => {
  let time = getTime();

  e.preventDefault();
  let raw_msg = msg_input.value;
  var msg = raw_msg.replace(/\n/g, "<br>");
  msg_input.value = "";
  msg_input.focus();

  let msg_div = document.createElement("div");
  msg_div.classList.add("from-user-msg");
  msg_div.innerHTML = `
    <p>${msg}</p>
    <span>${time}</span>
  `;

  if (msg.length > 0) {
    all_chats_children[
      idx
    ].children[1].lastElementChild.lastElementChild.appendChild(msg_div);
    all_chats_children[idx].scrollTop = all_chats_children[idx].scrollHeight;
  }
});

// attachment_btn.addEventListener('click', () => {
//   attachment_input.click();
// })

// attachment_input.addEventListener('change', () => {
//   const file = attachment_input.files[0];
//   msg_input.value += `Attached: ${file.name}`;
// })

// msg_input.addEventListener("keydown", (event) => {
//   if (event.key === "Enter" && !event.shiftKey) {
//     event.preventDefault();
//     msg_input_form.submit();
//   }
//   else if (event.shiftKey && event.key === "Enter") {
//     this.value += "\n";
//     event.preventDefault();
//   }
// });
