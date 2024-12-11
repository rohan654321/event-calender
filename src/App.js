import React, { useState } from "react";
import "./app.css"; // Import the CSS file for the app layout
import CalendarGrid from "./components/CalenderGrid";
import EventList from "./components/EventList";
import EventModal from "./components/EventModel";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6; // Sunday (0) or Saturday (6)
};

const App = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);

  const handleDayClick = (day) => {
    const formatted = formatDate(day);
    setSelectedDate(formatted);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (date, event) => {
    const formatted = formatDate(date);
    const updatedEvents = {
      ...events,
      [formatted]: [...(events[formatted] || []), event],
    };
    setFormattedDate(formatted);
    setSelectedDate(formatted);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (index) => {
    const date = new Date(selectedDate); // Parse selectedDate back to a Date object
    const formatted = formatDate(date); // Format it to ensure consistency
    const selectedEvents = [...(events[formatted] || [])];
    const eventToEdit = selectedEvents[index];
    setIsModalOpen(true);
    // Prefill EventModal with eventToEdit's data (requires additional logic in EventModal)
  };

  const handleDeleteEvent = (index) => {
    const date = new Date(selectedDate);
    const formatted = formatDate(date);
    const updatedEvents = {
      ...events,
      [formatted]: events[formatted].filter((_, idx) => idx !== index),
    };
    setEvents(updatedEvents);
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <CalendarGrid 
          events={events} 
          onDayClick={handleDayClick} 
          isWeekend={isWeekend} // Pass the isWeekend function to CalendarGrid
        />
      </div>
      <div className="event-list">
        {selectedDate && (
          <EventList
            events={{ date: formattedDate, list: events[formattedDate] || [] }}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </div>
      {isModalOpen && (
        <EventModal
          selectedDate={selectedDate}
          events={events}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default App;