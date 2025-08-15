import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import CardWrapper from "../components/Card.jsx";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { getEvents, getProfile, deleteEvent, registerEvent, user } = useAuth();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const eventsData = await getEvents();
      await getProfile();
      setEvents(eventsData);
    })();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/createevent/${id}`);
  };

  const handleRegister = async (id) => {
    try {
      if (token) {
        await registerEvent(id);
        setEvents((prev) =>
          prev.map((e) =>
            e._id === id ? { ...e, registeredUsers: [...(e.registeredUsers || []), user._id] } : e
          )
        );
      } else {
        alert("Login to register event");
        navigate("/signin");
      }
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <div className="events-container">
      {events.map((event) => {
        const isOwner = user?._id === event.userId._id;
        const isRegistered = event.registeredUsers?.includes(user?._id);

        return (
          <CardWrapper
            key={event._id}
            title={event.title}
            subheader={new Date(event.date).toLocaleDateString()}
            image={event.image}
          >
            <Typography sx={{ marginBottom: 1 }}>{event.description}</Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>Venue:</strong> {event.venue}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>Time:</strong> {event.time}
            </Typography>

            {isOwner ? (
              <>
                <IconButton aria-label="edit" onClick={() => handleEdit(event._id)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(event._id)}>
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleRegister(event._id)}
              >
                {isRegistered ? "Registered" : "Register"}
              </Button>
            )}
            {isRegistered && <Typography>You are registered</Typography>}
          </CardWrapper>
        );
      })}
    </div>
  );
};

export default Events;
