import React from "react";
import "./eventList.css"; // Import the CSS file for styling

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      <h3>Events for {events.date}</h3>
      {events.list && events.list.length > 0 ? (
        <ul>
          {events.list.map((event, idx) => (
            <li key={idx} className="event-item">
              <div>
                <strong>{event.name}</strong>
                <p>
                  {event.startTime} - {event.endTime}
                </p>
                {event.description && <p>{event.description}</p>}
              </div>
              <div className="event-actions">
                <button onClick={() => onEdit(idx)}>Edit</button>
                <button onClick={() => onDelete(idx)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
};

export default EventList;

