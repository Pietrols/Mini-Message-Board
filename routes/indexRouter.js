const { Router } = require("express");
const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// route 1: Display message
router.get("/", (req, res) =>
  res.render("Index", { title: "Mini Messageboard", messages: messages })
);

// route 2: show new message form
router.get("/new", (req, res) => res.render("form"));

// handle post
router.post("/new", (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).send("Missing user or text");
  }
  messages.push({ text, user, added: new Date() });
  res.redirect("/");
});

module.exports = router;
