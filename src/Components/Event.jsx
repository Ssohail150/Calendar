import React from 'react';
import './Event.css';

const Event = ({ event, deleteEvent }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
    }
  };

  return (
    <div className="event" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
      <span>{event.title}</span>
      <button onClick={handleDelete}>x</button>
    </div>
  );
};

export default Event;
