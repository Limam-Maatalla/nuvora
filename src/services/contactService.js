export const contactService = {
  async sendMessage(payload) {
    if (
      !payload?.name?.trim() ||
      !payload?.email?.trim() ||
      !payload?.message?.trim()
    )
      return { success: false, reason: "validation" };
    // Deliberately does not log or transmit personal data: no backend is configured.
    return { success: false, demo: true, reason: "not-configured" };
  },
};
