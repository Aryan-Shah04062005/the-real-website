const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email Server Error:', error);
  } else {
    console.log('✅ Email Server is ready to take messages');
  }
});

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // 1. Save to Database
    const contact = await Contact.create({ 
      name, 
      email, 
      subject, 
      message,
      ipAddress: req.ip 
    });

    // 2. Prepare Email
    const mailOptions = {
      from: `"The Real Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 New Contact: ${subject || 'Inquiry'} from ${name}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #333;">
            ${message}
          </div>
        </div>
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to ${process.env.EMAIL_USER}`);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('❌ Contact Submission Error:', error);
    res.status(500).json({ 
      error: 'Failed to process message', 
      details: error.message,
      code: error.code
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
