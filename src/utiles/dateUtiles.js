import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isToday,
    addMonths,
    subMonths,
  } from "date-fns";
  import { getDaysInMonth, formatDate, isDateToday, getOffsetMonth } from "./utils/dateUtils";
  
  /**
   * Generate a list of all days in the given month.
   * @param {Date} date - A date within the target month.
   * @returns {Array<Date>} - An array of dates for the month.
   */
  export const getDaysInMonth = (date) => {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });
  };
  
  /**
   * Format a date to a human-readable string.
   * @param {Date} date - The date to format.
   * @param {string} formatString - Format string (e.g., 'yyyy-MM-dd').
   * @returns {string} - Formatted date string.
   */
  export const formatDate = (date, formatString = "yyyy-MM-dd") => {
    return format(date, formatString);
  };
  
  /**

   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is today.
   */
  export const isDateToday = (date) => {
    return isToday(date);
  };
  
  /**
   * Get the previous or next month for a given date.
   * @param {Date} date - The current date.
   * @param {number} offset - Number of months to add/subtract (+1 for next, -1 for previous).
   * @returns {Date} - A new date offset by the specified months.
   */
  export const getOffsetMonth = (date, offset) => {
    return offset > 0 ? addMonths(date, offset) : subMonths(date, Math.abs(offset));
  };
const days = getDaysInMonth(new Date()); // Get all days in the current month
console.log(formatDate(new Date())); // Output: "2024-12-10"
console.log(isDateToday(new Date())); // Output: true
console.log(getOffsetMonth(new Date(), -1)); // Get the previous month