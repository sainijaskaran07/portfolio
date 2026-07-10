const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Contact form API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const result = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "sainijaskaransingh429@gmail.com",
      subject: subject,
      html: `
        <h2>${name}</h2>
        <p>Email: ${email}</p>
        <p>${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Email sent successfully",
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Email failed",
      error: error.message,
    });
  }
});

app.get("/contact", (req, res) => {
  res.send("Contact API is working. Use POST request.");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});