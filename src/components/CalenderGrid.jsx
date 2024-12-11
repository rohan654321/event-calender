import { Button, Card, Typography } from "@mui/material";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import React, { useEffect, useState } from "react";
import "./calenderGrid.css"; // Import the CSS file

const CalendarGrid = ({ events, onDayClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const isPast = (day) => {
    const today = new Date();
    return day < today.getDate() &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear();
  };

  const isWeekend = (day) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
  };

  useEffect(() => {
    console.log(isToday(days[10]));
  });

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <Button variant="outlined" onClick={handlePrevMonth}>
          Previous
        </Button>
        <Typography variant="h4" className="month-title">
          {format(currentMonth, "MMMM yyyy")}
        </Typography>
        <Button variant="outlined" onClick={handleNextMonth}>
          Next
        </Button>
      </header>

      <div className="calendar-grid">
        {days.map((day) => (
          <Card
            key={day}
            className={`day-card ${
              isToday(day) ? "today" : ""
            } ${isPast(day.getDate()) ? "past" : "selected"} ${
              isWeekend(day) ? "weekend" : ""
            }`}
            onClick={!isPast(day.getDate()) ? () => onDayClick(day) : undefined}
          >
            <Typography variant="subtitle1" className="day-number">
              {format(day, "d")}
            </Typography>
            {isWeekend(day) && <span className="red-mark">*</span>} {/* Mark weekends */}
            {events[format(day, "yyyy-MM-dd")] && (
              <ul className="event-list">
                {events[format(day, "yyyy-MM-dd")].map((event, idx) => (
                  <li key={idx} className="event-item">
                    {event.name}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
