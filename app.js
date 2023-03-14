//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const items = ["Buy Food"];
app.set("view engine", "ejs");

//app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {

    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    const day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newListItems: items
    });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Sever 3000 up and running!");
});