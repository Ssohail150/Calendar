import React, { useState, useEffect } from "react";
import Event from "./Event";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import "../styles/MonthlyCalendar.css";

const MonthlyCalendar = () => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    color: getRandomColor(),
  });
  const [draggedEvent, setDraggedEvent] = useState(null);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleOpenForm = (date) => {
    setSelectedDate(date);
    setIsFormOpen(true);
  };

  const handleAddEvent = () => {
    const eventDetails = { id: Date.now(), date: selectedDate, ...newEvent };
    setEvents([...events, eventDetails]);
    setIsFormOpen(false);
    setNewEvent({ title: "", color: getRandomColor() });
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleDragEnd = () => {
    setDraggedEvent(null);
  };

  const handleDrop = (date) => {
    if (draggedEvent) {
      const updatedEvent = { ...draggedEvent, date };
      setEvents(
        events.map((event) =>
          event.id === draggedEvent.id ? updatedEvent : event
        )
      );
      setDraggedEvent(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const extendEvent = (date) => {
    if (draggedEvent) {
      const updatedEvent = { ...draggedEvent, endDate: date };
      setEvents(
        events.map((event) =>
          event.id === draggedEvent.id ? updatedEvent : event
        )
      );
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="monthly-calendar">
      <div className="calendar-content">
        <header className="calendar-header">
          <button onClick={goToPreviousMonth}>Previous</button>
          <h1>{format(currentMonth, "MMMM yyyy")}</h1>
          <button onClick={goToNextMonth}>Next</button>
        </header>
        <div className="calendar-grid">
          {daysInMonth.map((day) => (
            <div
              key={day}
              className={`calendar-cell ${isToday(day) ? "today" : ""}`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(day)}
              onMouseUp={() => extendEvent(day)}
              onClick={() => handleOpenForm(day)}
            >
              <div>{format(day, "d")}</div>
              {events
                .filter(
                  (event) =>
                    format(new Date(event.date), "yyyy-MM-dd") ===
                    format(day, "yyyy-MM-dd")
                )
                .map((event) => (
                  <Event
                    key={event.id}
                    event={event}
                    onDelete={handleDeleteEvent}
                    onDragStart={() => handleDragStart(event)}
                    onDragEnd={handleDragEnd}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
     
      {isFormOpen && (
        <div className="event-form">
          <h2>Add Event</h2>
          <label>
            Title:
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
          </label>
          <button onClick={handleAddEvent}>Add Event</button>
          <button onClick={() => setIsFormOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MonthlyCalendar;
