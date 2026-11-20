const express = require('express');
const router = express.Router();
const { sendTextLkSMS } = require('../utils/sendSMS');

// 1. Billing & Thermal Print -> Single Customer Bill SMS
router.post('/bill', async (req, res) => {
  try {
    const { phone, shopName, invoiceId, total, customerName } = req.body;

    if (!phone || phone === 'N/A') {
      return res.status(400).json({ success: false, message: 'Valid customer phone is required' });
    }

    const message = `Thank you ${customerName || 'Customer'} for visiting ${shopName || 'SSR RESTO POS'}! Bill No: ${invoiceId}, Total: Rs.${Number(total).toLocaleString()}.00. Come again!`;

    const result = await sendTextLkSMS(phone, message);
    res.json({ success: true, message: 'Bill SMS sent via Text.lk', data: result.data });
  } catch (error) {
    console.error('Text.lk Bill SMS Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Failed to send bill SMS' });
  }
});

// 2. Marketing & Offers SMS -> Single or Broadcast Campaign SMS
router.post('/broadcast', async (req, res) => {
  try {
    const { targets, message, shopName } = req.body;

    if (!Array.isArray(targets) || targets.length === 0 || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'Targets and SMS message are required' });
    }

    const finalMessage = shopName ? `${shopName}: ${message.trim()}` : message.trim();

    const result = await sendTextLkSMS(targets, finalMessage);
    res.json({
      success: true,
      sentCount: targets.length,
      message: `Broadcast SMS sent to ${targets.length} recipient(s) via Text.lk`,
      data: result.data
    });
  } catch (error) {
    console.error('Text.lk Broadcast SMS Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Failed to send broadcast SMS' });
  }
});

module.exports = router;