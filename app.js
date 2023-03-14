//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

//app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {

    const today = new Date();
    const currentDay = today.getDay();
    let day = "";

    switch (currentDay) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
        default:
            console.log("Error: current day is equal to: " + currentDay);
    }

    res.render("list", {
        kindOfDay: day
    });
});

app.post("/", function (req, res) {

})

app.listen(3000, function () {
    console.log("Sever 3000 up and running!");
});