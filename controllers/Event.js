function isValidEvent(event) {
  if (!event.name || !event.date || !event.category) {
    return { valid: false, message: "Missing required event fields" };
  }

  const eventDate = new Date(event.date);

  if (isNaN(eventDate.getTime())) {
    return { valid: false, message: "Invalid date format" };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate < now) {
    return { valid: false, message: "Event date cannot be in the past" };
  }

  return { valid: true, message: "Event is valid" };
}

const validateEventDate = {
  isValidDateString: (dateStr) => {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  },

  isFutureOrToday: (dateStr) => {
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime())) return false;

    const today = new Date();
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return eventDate >= today;
  },
};

const EventValidator = {
  validateEvent: (eventData) => {
    if (!eventData) {
      return { valid: false, message: "Event data is required" };
    }

    if (
      !eventData.name ||
      typeof eventData.name !== "string" ||
      eventData.name.trim() === ""
    ) {
      return {
        valid: false,
        message: "Event name is required and must be a non-empty string",
      };
    }

    if (!eventData.date) {
      return { valid: false, message: "Event date is required" };
    }

    if (!validateEventDate.isValidDateString(eventData.date)) {
      return { valid: false, message: "Invalid date format" };
    }

    if (!validateEventDate.isFutureOrToday(eventData.date)) {
      return { valid: false, message: "Event date cannot be in the past" };
    }

    return { valid: true };
  },
};

module.exports = {
  isValidEvent,
  validateEvent: EventValidator.validateEvent,
  isValidDateString: validateEventDate.isValidDateString,
  isFutureOrToday: validateEventDate.isFutureOrToday,
};
