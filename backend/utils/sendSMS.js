const TEXTLK_ENDPOINT = 'https://app.text.lk/api/v3/sms/send';

const formatSriLankaPhone = (phone) => {
  let cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return '94' + cleaned.slice(1);
  }
  return cleaned;
};

const sendTextLkSMS = async (recipients, message) => {
  const apiToken = process.env.TEXTLK_API_TOKEN;
  const senderId = process.env.TEXTLK_SENDER_ID || 'TextLKDemo';

  if (!apiToken) {
    throw new Error('TEXTLK_API_TOKEN is missing in environment variables');
  }

  const list = Array.isArray(recipients) ? recipients : [recipients];
  const formattedRecipients = list
    .map(formatSriLankaPhone)
    .filter(Boolean)
    .join(',');

  if (!formattedRecipients) {
    throw new Error('No valid recipient phone numbers provided');
  }

  const response = await fetch(TEXTLK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      recipient: formattedRecipients,
      sender_id: senderId,
      type: 'plain',
      message: message
    })
  });

  const data = await response.json();

  if (!response.ok || data.status === 'error' || data.status === false) {
    throw new Error(data.message || `Text.lk API request failed (${response.status})`);
  }

  return data;
};

module.exports = { sendTextLkSMS, formatSriLankaPhone };