import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const CreateEvent = () => {
  const { createEvent, loading } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    venue: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createEvent(form);
    alert(res.message || "Event created");
  };

  return (
    <div className="form-container">
      <h2>Create Event</h2>
      <div className="create-event-form">
      <form onSubmit={handleSubmit} className="create-event-form">
        <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <input className="form-input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input className="form-input" placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input className="form-input" placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateEvent;
