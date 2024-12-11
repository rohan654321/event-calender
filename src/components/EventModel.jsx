import { format } from "date-fns"; // Import date-fns for date formatting
import React, { useState } from "react";
import "./eventModel.css"; // Import the CSS file for styling

const EventModal = ({ selectedDate, events, onClose, onSave }) => { 
  const [eventData, setEventData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = () => {
    // console.log(selectedDate)
    if (eventData.name && eventData.startTime && eventData.endTime) {
      onSave(selectedDate, eventData);
      onClose();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="event-modal">
      <div className="modal-content">
        <h2>Add Event for {format(selectedDate, "MMMM d, yyyy")}</h2> {/* Format date here */}
        <form className="event-form">
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Event Name"
              value={eventData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              value={eventData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="button" className="save-button" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
