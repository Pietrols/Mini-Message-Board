const express = require('express');

module.exports = (messages) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        console.log("We're live")
        res.render("index", { title: "Mini Message Board", messages: messages });
    });

    router.get("/new", (req, res) => {
        res.render("newForm", { title: "New Message" });
    })

    router.post("/new", (req, res) => {
    const newMessage = {
        text: req.body.text,
        user: req.body.user,
        added: new Date()
    };
    messages.push(newMessage);
    res.redirect("/");
})
    return router;
}
