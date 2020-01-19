const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect database

connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the contact keeper" }));

// Define Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started at port ${PORT} `));
