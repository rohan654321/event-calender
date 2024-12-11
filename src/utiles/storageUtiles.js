import { loadEvents, saveEvents, addEvent, deleteEvent } from "./utils/storageUtils";

const STORAGE_KEY = "eventCalendarData";


/**
 * Load events from localStorage.
 * @returns {Object} - Parsed events object or an empty object if none exist.
 */
export const loadEvents = () => {
  const eventsJSON = localStorage.getItem(STORAGE_KEY);
  return eventsJSON ? JSON.parse(eventsJSON) : {};
};

/**
 * Save events to localStorage.
 * @param {Object} events - Events object to save.
 */
export const saveEvents = (events) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

/**
 * Add an event to a specific date in the events object.
 * @param {string} date - The date in "yyyy-MM-dd" format.
 * @param {Object} event - Event object to add.
 * @param {Object} events - Existing events object.
 * @returns {Object} - Updated events object.
 */
export const addEvent = (date, event, events) => {
  const updatedEvents = {
    ...events,
    [date]: [...(events[date] || []), event],
  };
  saveEvents(updatedEvents);
  return updatedEvents;
};

/**
 * Delete an event from a specific date in the events object.
 * @param {string} date - The date in "yyyy-MM-dd" format.
 * @param {number} index - The index of the event to delete.
 * @param {Object} events - Existing events object.
 * @returns {Object} - Updated events object.
 */
export const deleteEvent = (date, index, events) => {
  const updatedEvents = {
    ...events,
    [date]: events[date].filter((_, idx) => idx !== index),
  };
  if (updatedEvents[date].length === 0) {
    delete updatedEvents[date]; // Remove date if no events remain
  }
  saveEvents(updatedEvents);
  return updatedEvents;
};


let events = loadEvents(); // Load events from localStorage
console.log(events);

events = addEvent("2024-12-10", { name: "Meeting", startTime: "10:00", endTime: "11:00" }, events);
console.log(events);

events = deleteEvent("2024-12-10", 0, events); // Remove the first event from the day
console.log(events);



