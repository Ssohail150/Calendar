import React, { useState } from 'react';
import Event from './Event';
import './Day.css';

const Day = ({ day, events, addEvent, deleteEvent, isToday }) => {
  const [dragging, setDragging] = useState(false);
  const [newEvent, setNewEvent] = useState('');

  const handleDrop = () => {
    if (newEvent) {
      addEvent(new Date(new Date().setDate(day)).toISOString(), { id: Date.now(), title: newEvent });
      setNewEvent('');
    }
    setDragging(false);
  };

  return (
    <div 
      className={`day ${isToday ? 'today' : ''} ${dragging ? 'dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="date">{day}</div>
      {events.map(event => (
        <Event key={event.id} event={event} deleteEvent={deleteEvent} />
      ))}
      <input 
        type="text"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        placeholder="New Event"
        onKeyDown={(e) => { if (e.key === 'Enter') handleDrop(); }}
      />
    </div>
  );
};

export default Day;
