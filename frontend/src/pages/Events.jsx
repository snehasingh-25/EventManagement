import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import CardWrapper from "../components/Card.jsx";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

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
    <div
      className="events-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {events.map((event) => (
        <CardWrapper
          key={event._id}
          title={event.title}
          subheader={new Date(event.date).toLocaleDateString()}
          image={event.image}
          children={
            <>
              <Typography sx={{ marginBottom: 1 }}>{event.description}</Typography>
              <Typography sx={{ marginBottom: 1 }}>
                <strong>Venue:</strong> {event.venue}
              </Typography>
              <Typography sx={{ marginBottom: 1 }}>
                <strong>Time:</strong> {event.time}
              </Typography>
            </>
          }
          actions={
            <>
              <IconButton aria-label="favorite">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </>
          }
          expandable={true}
        />
      ))}
    </div>
  );
};

export default Events;
