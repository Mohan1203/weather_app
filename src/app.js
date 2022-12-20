const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast")

const app = express();


//Define path of files 
const htmlPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partial");


//setup handlebar engine and view location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//setup static directory path
app.use(express.static(htmlPath));

app.get("", (req, res) => {
    res.render("index", {
        name: "Mohan",
        title: "Weather"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "This is message of help",
        name: "Mohan",
        title: "Help"
    })
})


app.get("/about", (req, res) => {
    res.render("about", {
        name: "Mohan",
        title: "About"
    })
})



app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            message: "The search term is requered"
        })
    }
    let address = req.query.address;
    forecast(address, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                forecast: data,
                address
            });
        }
    })
})

app.get("/products", (req, res) => {
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404",
        message: "Help article not found",
        name: "Mohan"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        message: "Page not found",
        name: "Mohan"
    });
})

app.listen(3000, () => {
    console.log("App is listen on 3000")
})