const EMAIL_COOLDOWN_MS = 60 * 1000;

const canSendEmail = (user) => {
  if (!user.lastEmailSentAt) return true;

  const now = Date.now();
  const lastSent = new Date(user.lastEmailSentAt).getTime();

  return now - lastSent > EMAIL_COOLDOWN_MS;
};

module.exports = { canSendEmail, EMAIL_COOLDOWN_MS };