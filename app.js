const express =  require("express");
const path =  require("path");
const fs =  require("fs");
const mysql =  require("mysql");
const bodyParser =  require("body-parser");

const app = express();
const api = require("./api/users");
const { registerValidation } = require("./controllers/validation");


const port = process.env.PORT || 5000;

// const url = "https://ifeanyi-fake-server-app.herokuapp.com/users";

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));


//json bodyParser
app.use(bodyParser.json());


//set static folder
app.use(express.static(path.join(__dirname, "/public")))



//set template engine
app.set("view engine", "ejs");

//set views file
app.set("views", path.join(__dirname, "views"));



//fetch from database
app.get("/", async (req, res) => {
    let sql = "SELECT * FROM people";
    let response = await api.get(`./users`)
    
    res.render("index", {
        users: response.data
    })
})


//add user
app.get("/add", (req, res) => {
    res.render("user_add", {
        title: "CRUD Operation using NodeJS / ExpressJS / JSON-server",
    })
})


//insert a person
app.post("/save", async (req, res) => {
    const { error } = registerValidation(req.body);
    let data = { firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address };
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        let response = await api.post(`/users`, data)
        res.redirect("/");
    }
})


app.get("/edit/:userId", async (req, res) => {
    const userId = req.params.userId;
    let { data } = await api.get(`/users/${userId}`);
    res.render(`user_edit`, {
        title: "CRUD Operation using NodeJS / ExpressJS / JSON-server",
        user: data
    });
});

app.post("/update", async (req, res) => {
    const { error } = registerValidation(req.body);

    let userData = { firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address }
    const userId = req.body.id;

    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        let {data} = await api.patch(`/users/${userId}`, userData)
        res.redirect("/");
    }
})


app.get("/delete/:userId", async (req, res) => {
    const userId = req.params.userId
    let { data } = await api.delete(`/users/${userId}`);
    res.redirect("/");
});




app.listen(port, () => console.log("sever is on 5000"));