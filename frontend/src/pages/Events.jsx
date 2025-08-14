import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import CreateEvent from "./CreateEvent.jsx";

const Events = () => {
  const { getEvents } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getEvents();
      setEvents(data);
    })();
  }, []);

  return (
    <div className="events-container">
        <CreateEvent />
      <h2>All Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            {event.image && <img src={event.image} alt={event.title} className="event-image" />}
            <p>{event.description}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
