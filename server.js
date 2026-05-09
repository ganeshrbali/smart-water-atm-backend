require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Smart Water ATM Backend Running");
});

app.post("/api/install-request", async (req, res) => {
  console.log("Customer Request:", req.body);

  const { name, email, phone, address } = req.body;

  try {

    // ADMIN EMAIL
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ganeshrbali@gmail.com",
      subject: "New Smart Water ATM Installation Request",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        
          <h2 style="color:#2563eb;">
            New Installation Request
          </h2>

          <hr />

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Address:</strong> ${address}</p>

        </div>
      `,
    });

    // CUSTOMER CONFIRMATION EMAIL
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Smart Water ATM Installation Request Registered",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">

          <h1 style="color:#2563eb;">
            SPARK INNOVATORS
          </h1>

          <hr />

          <p>Dear <strong>${name}</strong>,</p>

          <p>
            Thank you for registering your Smart Water ATM installation request.
          </p>

          <p>
            Your request has been successfully received by our team.
          </p>

          <p>
            Our technical team will contact you shortly regarding:
          </p>

          <ul>
            <li>Installation process</li>
            <li>Site verification</li>
            <li>Pricing and setup</li>
            <li>Technical assistance</li>
          </ul>

          <br />

          <div style="background:#f3f4f6; padding:16px; border-radius:10px;">
            <h3>Customer Support</h3>

            <p><strong>Helpline:</strong> +91 7975671994</p>

            <p><strong>Email:</strong> ganeshrbali@gmail.com</p>
          </div>

          <br />

          <p>Regards,</p>

          <h3 style="margin-bottom:0;">
            SPARK INNOVATORS TEAM
          </h3>

          <p style="color:gray;">
            Smart Water ATM Solutions
          </p>

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