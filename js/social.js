// =========================
//   FRIENDS SYSTEM
// =========================

function addFriend() {
  const user = getCurrentUser();
  const friend = document.getElementById("friend-name").value.trim();

  if (!friend) return;
  if (friend === user.username) return;

  const users = loadUsers();
  if (!users.some(u => u.username === friend)) {
    alert("Taki użytkownik nie istnieje");
    return;
  }

  if (!user.friends.includes(friend)) {
    user.friends.push(friend);
    saveUpdatedUser(user);
  }

  updateFriendsUI();
}

function updateFriendsUI() {
  const user = getCurrentUser();
  const list = document.getElementById("friends-list");

  if (!list) return;

  list.innerHTML = "";

  user.friends.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    list.appendChild(li);
  });
}

// =========================
//   GROUPS SYSTEM
// =========================

function createGroup() {
  const user = getCurrentUser();
  const name = document.getElementById("group-name").value.trim();

  if (!name) return;

  const group = {
    id: Date.now(),
    name,
    messages: []
  };

  user.groups.push(group);
  saveUpdatedUser(user);

  updateGroupsUI();
}

function updateGroupsUI() {
  const user = getCurrentUser();
  const list = document.getElementById("groups-list");

  if (!list) return;

  list.innerHTML = "";

  user.groups.forEach(g => {
    const li = document.createElement("li");
    li.textContent = g.name;
    li.onclick = () => openGroupChat(g.id);
    list.appendChild(li);
  });
}

// =========================
//   GROUP CHAT
// =========================

let currentGroupId = null;

function openGroupChat(id) {
  currentGroupId = id;

  const user = getCurrentUser();
  const group = user.groups.find(g => g.id === id);

  if (!group) return;

  document.getElementById("group-chat-title").textContent = group.name;

  loadGroupMessages();
  goToScreen("screen-group-chat");
}

function loadGroupMessages() {
  const user = getCurrentUser();
  const group = user.groups.find(g => g.id === currentGroupId);

  const box = document.getElementById("group-chat-messages");
  box.innerHTML = "";

  group.messages.forEach(m => {
    const div = document.createElement("div");
    div.textContent = `${m.author}: ${m.text}`;
    box.appendChild(div);
  });
}

function sendGroupMessage() {
  const input = document.getElementById("group-chat-input");
  const text = input.value.trim();
  if (!text) return;

  const user = getCurrentUser();
  const group = user.groups.find(g => g.id === currentGroupId);

  group.messages.push({
    author: user.username,
    text,
    time: Date.now()
  });

  saveUpdatedUser(user);

  input.value = "";
  loadGroupMessages();
}
