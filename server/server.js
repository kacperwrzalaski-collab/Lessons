const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// ====== MongoDB ======
mongoose.connect("MONGODB_CONNECTION_STRING", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ====== Schemat użytkownika ======
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  xp: Number,
  level: Number,
  practiceCorrect: Number,
  practiceTotal: Number,
  quizCorrect: Number,
  quizTotal: Number,
  photo: String,
  achievements: Array,
  friends: Array,
  groups: Array
});

const User = mongoose.model("User", UserSchema);

// ====== Schemat grup ======
const GroupSchema = new mongoose.Schema({
  name: String,
  members: Array,
  messages: Array
});

const Group = mongoose.model("Group", GroupSchema);

// ====== API ======

// Rejestracja
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ error: "Użytkownik istnieje" });

  const user = new User({
    username,
    password,
    xp: 0,
    level: 1,
    practiceCorrect: 0,
    practiceTotal: 0,
    quizCorrect: 0,
    quizTotal: 0,
    photo: null,
    achievements: [],
    friends: [],
    groups: []
  });

  await user.save();
  res.json({ success: true });
});

// Logowanie
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.json({ error: "Błędne dane" });

  res.json(user);
});

// Ranking
app.get("/api/ranking", async (req, res) => {
  const users = await User.find({});
  users.sort((a, b) => (b.level * 100 + b.xp) - (a.level * 100 + a.xp));
  res.json(users);
});

// Dodawanie znajomego
app.post("/api/friends/add", async (req, res) => {
  const { username, friend } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ error: "Nie znaleziono użytkownika" });

  if (!user.friends.includes(friend)) {
    user.friends.push(friend);
    await user.save();
  }

  res.json({ success: true });
});

// Tworzenie grupy
app.post("/api/groups/create", async (req, res) => {
  const { username, name } = req.body;

  const group = new Group({
    name,
    members: [username],
    messages: []
  });

  await group.save();

  const user = await User.findOne({ username });
  user.groups.push(group._id);
  await user.save();

  res.json({ success: true, groupId: group._id });
});

// Wysyłanie wiadomości
app.post("/api/groups/send", async (req, res) => {
  const { groupId, author, text } = req.body;

  const group = await Group.findById(groupId);
  if (!group) return res.json({ error: "Grupa nie istnieje" });

  group.messages.push({ author, text, time: Date.now() });
  await group.save();

  res.json({ success: true });
});

// Pobieranie wiadomości
app.get("/api/groups/:id/messages", async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.json({ error: "Grupa nie istnieje" });

  res.json(group.messages);
});

// ====== Start ======
app.listen(3000, () => console.log("Server działa na porcie 3000"));
