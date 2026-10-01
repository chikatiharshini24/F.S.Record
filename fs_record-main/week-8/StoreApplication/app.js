const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// REGISTER
app.post("/register", (req, res) => {

    const newUser = req.body;

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    users.push(newUser);

    fs.writeFileSync(
        "users.json",
        JSON.stringify(users, null, 2)
    );

    res.send(`
        <h2>Registration Successful!</h2>
        <p>You can now login.</p>
        <a href="/login.html">Go to Login</a>
    `);
});


// LOGIN
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    const user = users.find(
        u =>
            u.username === username &&
            u.password === password
    );

    if (user) {

        res.redirect("/dashboard.html");

    } else {

        res.send(`
            <h2>Invalid Username or Password</h2>
            <a href="/login.html">Try Again</a>
        `);

    }
});


// START SERVER
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});