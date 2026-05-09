require("dotenv").config();


const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Water ATM Backend Running");
});

app.post("/api/install-request", async (req, res) => {
  console.log("Customer Request:", req.body);

  const { name, email, phone, address } = req.body;

try {
  await transporter.sendMail({
    from: "ganeshrbali@gmail.com",
    to: "ganeshrbali@gmail.com",
    subject: "New Smart Water ATM Installation Request",
    html: `
      <h2>New Installation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
    `,
  });
    await transporter.sendMail({
    from: "ganeshrbali@gmail.com",
    to: email,
    subject: "Smart Water ATM Installation Request Registered",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h2 style="color:#2563eb;">SPARK INNOVATORS</h2>

        <p>Dear ${name},</p>

        <p>
          Your installation request for the Smart Water ATM system
          has been successfully registered.
        </p>

        <p>
          Our team will contact you shortly regarding installation
          and further assistance.
        </p>

        <hr />

        <h3>Customer Support</h3>

        <p><strong>Helpline:</strong> +91 7975671994</p>
        <p><strong>Email:</strong> ganeshrbali@gmail.com</p>

        <br />

        <p>Regards,</p>

        <h3>SPARK INNOVATORS TEAM</h3>

      </div>
    `,
  });

    res.json({
      success: true,
      message: "Installation request submitted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});