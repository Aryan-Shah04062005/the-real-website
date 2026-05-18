const Contact = require('../models/Contact');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Save to Database
    await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip
    });

    // 2. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'The Real Website <onboarding@resend.dev>',
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 New Contact: ${subject || 'Inquiry'} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #0A2472; border-bottom: 2px solid #00E5FF; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background: #eee;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Subject:</td>
              <td style="padding: 8px;">${subject || 'N/A'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; background: #fff; padding: 20px; border-left: 4px solid #00E5FF; border-radius: 4px;">
            <strong>Message:</strong><br/><br/>
            ${message}
          </div>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">
            Sent from The Real Website Contact Form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.message, code: error.name });
    }

    console.log(`📧 Email sent successfully! ID: ${data.id}`);
    res.status(201).json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error('❌ Contact Submission Error:', error);
    res.status(500).json({ error: 'Failed to process message', details: error.message, code: error.code });
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
