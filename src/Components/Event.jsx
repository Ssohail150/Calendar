import React from "react";
import "../styles/Event.css";

const Event = ({ event, onDelete, onDragStart, onDragEnd }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("event-id", event.id);
    onDragStart(event);
  };

  return (
    <div
      className="event"
      style={{ backgroundColor: event.color }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <p>{event.title}</p>
      <button onClick={() => onDelete(event.id)}>Delete</button>
    </div>
  );
};

export default Event;
