import React, { useState, useEffect } from 'react';
import Resource from './Resources';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState(['Alice', 'Bob', 'Charlie']);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (resource, date, newEvent) => {
    setEvents([...events, { ...newEvent, resource, date }]);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>Previous</button>
        <h2>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="resources-grid">
        {resources.map(resource => (
          <Resource
            key={resource}
            resource={resource}
            daysArray={daysArray}
            events={events.filter(event => event.resource === resource)}
            addEvent={addEvent}
            deleteEvent={deleteEvent}
            currentMonth={currentMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
