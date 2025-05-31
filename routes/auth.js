const express = require("express")
const User = require("../models/user.models.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()
const auth = require("../middlewares/auth.js")

router.get("/",(req,res)=>{
    res.send("Auth router Working properly")
})

router.post("/register", async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [ { userName }, { email } ] });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, email, password: hashedPassword });

        res.status(201).json({ message: 'User created', success: true, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist!", success: false });
        }

        const isPasswordMatching = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatching) {
            return res.status(401).json({ message: "Incorrect password!", success: false });
        }

        // Create JWT Token
        const token = jwt.sign(
            { email: existingUser.email, userName: existingUser.userName }, 
            process.env.JWT_TokenKey,
            { expiresIn: "2h" } 
        );

        res.cookie("token", token, {
        httpOnly: true,       // Prevents JS access (XSS protection)
        secure: true,         // Use true in production with HTTPS
        sameSite: "Strict",   // Prevent CSRF
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.status(200).json({ 
            message: 'Login Successful', 
            success: true, 
            userId: existingUser._id,
            token 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/logout",auth, (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful", success: true });
});



module.exports = router
