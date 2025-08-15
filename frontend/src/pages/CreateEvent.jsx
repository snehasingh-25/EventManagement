import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createEvent, getEventById, updateEvent, loading } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    venue: ""
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getEventById(id);
        setForm({
          title: data.title,
          description: data.description,
          image: data.image || "",
          date: data.date.split("T")[0],
          time: data.time,
          venue: data.venue
        });
      })();
    }
  }, [id, getEventById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (id) {
      res = await updateEvent(id, form);
      alert(res.message || "Event updated");
    } else {
      res = await createEvent(form);
    }
    navigate("/events");
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Event" : "Create Event"}</h2>
      <div className="create-event-form">
        <form onSubmit={handleSubmit} className="create-event-form">
          <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
          <input className="form-input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="form-input" placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <input className="form-input" placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? (id ? "Updating..." : "Creating...") : (id ? "Update Event" : "Create Event")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
