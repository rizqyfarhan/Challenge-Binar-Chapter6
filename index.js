const express = require("express");
const app = express();
const users = require("./db/user.json");
/******new ch 6******/
const { Game, Biodata, History } = require("./models");
/******new ch 6******/
const game = require('./routes/game');
/******new ch 6******/
const history = require('./routes/history');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets"));
app.use(express.json());
/******new ch 6******/
app.use(game);
/******new ch 6******/
app.use(history);
app.set("view engine", "ejs");

let isLogin = false;

/******new ch 6******/
app.get("/", async (_, res) => {
    const data = await Game.findAll({
        include: [Biodata, History],
    });
    res.json(data);
});

app.use((req, res, next) => {
    if (req.url === "/game" && !isLogin) {
        res.redirect("/login");
    }

    next();
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/user/", (req, res) => {
    const { nama, email, password } = req.body;

    const user = {
        nama,
        email,
        password
    };

    users.push(user);
    res.json(user);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/game", (req, res) => {
    res.render("game");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login", {
        error: "",
    });
});

app.post("/login/auth", (req, res) => {
    const user = require("./db/user.json");

    if (user.email === req.body.userEmail && user.password === req.body.userPassword) {
        isLogin = true;
        res.redirect("/game");
    } else {
        res.render("login", {
            error: "Incorrect email address or password",
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running...");
});
