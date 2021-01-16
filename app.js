const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();


app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));


const dburl = process.env.DATABASEURL || 'mongodb://localhost:27017/userDB'

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);


app.get("/", function (req, res) {
    res.render("home");
});


app.get("/login", function (req, res) {
    res.render("login");
});


app.get("/register", function (req, res) {
    res.render("register");
});


app.post('/register'), (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    const newUser = new User({
        email: username,
        password: password
    });
    newUser.save((err) => {
        if(err) {
            console.log(err);
        } else {
            res.render('secrets');
        }
    });
}



app.listen(3000, function () {

    console.log("Server started on port 3000");

});