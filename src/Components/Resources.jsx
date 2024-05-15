import React from 'react';
import Day from './Day';
import './Resources.css';

const Resource = ({ resource, daysArray, events, addEvent, deleteEvent, currentMonth }) => {
  return (
    <div className="resource">
      <h3>{resource}</h3>
      <div className="days-grid">
        {daysArray.map((day, index) => (
          <Day 
            key={index} 
            day={day} 
            events={events.filter(event => new Date(event.date).getDate() === day)} 
            addEvent={(date, newEvent) => addEvent(resource, date, newEvent)} 
            deleteEvent={deleteEvent}
            isToday={new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear()}
          />
        ))}
      </div>
    </div>
  );
};

export default Resource;
