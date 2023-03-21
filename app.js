//jshint esversion:6

const path = require('path')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {
    MongoClient
} = require("mongodb");
const uri = "mongodb+srv://KuraiOG:XyHYvVb5Y80KPC6w@cluster0.1nx30vc.mongodb.net/todolistDB";
const client = new MongoClient(uri);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(uri);

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your To Do List."
});
const item2 = new Item({
    name: "Hit the '+' button to add a new item."
});
const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

async function seedDB() {
    try {
        await Item.insertMany(defaultItems);
        console.log("Successfully added item to DB");
    } catch (err) {
        console.log(err);
    } finally {
        // Ensures that the client will close when you finish/error
        client.close();
    }
};

app.get("/", async function (req, res) {
    try {
        const foundItems = await Item.find({});
        console.log(foundItems);
        res.render("list", {
            listTitle: "Today",
            newListItems: foundItems
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving items from database");
    }
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
    seedDB().then(() => {
        console.log("Server 3000 up and running!");
    }).catch(err => {
        console.log(err);
    });
});