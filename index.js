const express = require("express");
const dotenv = require("dotenv");
const connect_DB = require("./config/db");
const cookiParser = require("cookie-parser")
const path = require("path")


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookiParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// mymusicapi/v1/home
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.get("/mymusicapi/v1/home", (req, res) => {
    res.send("Music Player API Running");
});

//Routes
app.use("/mymusicapi/v1/auth",require("./routes/auth.js"));
app.use("/mymusicapi/v1/music",require("./routes/music.js"));

// Connect DB and start server
connect_DB()
    .then(() => {
        console.log("✅ Database connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Server not started. DB connection failed.");
        console.error(error.message);
        process.exit(1); // Exit process if DB connection fails
    });
