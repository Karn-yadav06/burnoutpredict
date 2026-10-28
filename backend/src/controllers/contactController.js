import { Contact } from '../models/Contact.js';

export const createContactRequest = async (req, res) => {
  const { name, company, email, phone, employees, hrSoftware, industry, requirements } = req.body;

  try {
    const contact = await Contact.create({
      name,
      company,
      email: email.toLowerCase(),
      phone: phone || '',
      employees,
      hrSoftware: hrSoftware || '',
      industry: industry || '',
      requirements: requirements || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Demo request successfully booked! Our team will contact you shortly.',
      contact
    });
  } catch (error) {
    console.error('Error creating contact request:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error saving contact request.'
    });
  }
};

export const getContactRequests = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching contacts.'
    });
  }
};
