const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Contact = require('./src/models/Contact');
require('dotenv').config();

const sendAllMessages = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    if (contacts.length === 0) {
      console.log('No contacts found in the database.');
      process.exit(0);
    }

    console.log(`Found ${contacts.length} messages. Preparing email...`);

    let htmlContent = `<div style="font-family: sans-serif; padding: 20px;">
      <h2>📬 Your Message Archive</h2>
      <p>Here are all the messages currently stored in your database:</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
    `;

    contacts.forEach((contact, index) => {
      htmlContent += `
        <div style="margin-bottom: 30px; padding: 15px; background: #f9f9f9; border-left: 4px solid #00E5FF;">
          <h3 style="margin-top: 0;">Message #${contacts.length - index}</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Date:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
          <p><strong>Message:</strong><br/>${contact.message}</p>
        </div>
      `;
    });

    htmlContent += `</div>`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"The Real Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📂 ALL SAVED MESSAGES ARCHIVE (${contacts.length} total)`,
      html: htmlContent,
    };

    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('✅ Archive email sent successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

sendAllMessages();
