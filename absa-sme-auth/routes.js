const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("./db");
require("dotenv").config();

const router = express.Router();

// **User Registration**
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "All fields required" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const request = pool.request();
        request.input("name", name);
        request.input("email", email);
        request.input("password", hashedPassword);

        await request.query(
            "INSERT INTO users (name, email, password) VALUES (@name, @email, @password)"
        );
        res.status(201).json({ msg: "User registered successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// **User Login**
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "All fields required" });

    try {
        const request = pool.request();
        request.input("email", email);
        const result = await request.query("SELECT * FROM users WHERE email = @email");

        if (result.recordset.length === 0) return res.status(400).json({ msg: "User not found" });

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
