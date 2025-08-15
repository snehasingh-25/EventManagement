import axios from "axios";
import { useState } from "react";
import { API } from "../api";
const API_URL = "https://eventmanagement-60yw.onrender.com";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/signup`, data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/signin`, data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async () => {
    const res = await axios.get(`${API_URL}/events`);
    return res.data;
  };


  const createEvent = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_URL}/createevent`, data, {
      headers: { token }
    });
    return res.data;
  };

  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/events/${id}`, { headers: { token } });
  };
  const getEventById = async (id) => {
  const res = await axios.get(`${API_URL}/events/${id}`, {
    headers: { token }
  });
  return res.data;
};

const updateEvent = async (id, data) => {
  const res = await axios.put(`${API_URL}/events/${id}`, data, {
    headers: { token }
  });
  return res.data;
};


const registerEvent = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/events/${id}/register`, {}, {
    headers: { token }
  });
  return res.data;
};

  const getProfile = async () => {
    if (!token) return null;
    const res = await axios.get(`${API_URL}/profile`, {
      headers: { token }
    });
    setUser({ _id: res.data._id, name: res.data.username, email: res.data.email });
    return res.data;
  };

  return { signup, signin, getEvents, createEvent, deleteEvent, getEventById, updateEvent, registerEvent, getProfile, user,loading };
};
