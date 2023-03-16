//jshint esversion:6

const path = require('path')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const items = ["Buy Food"];
const workItems = [];
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    const day = date.getDate()
    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function () {
    console.log("Sever 3000 up and running!");
});