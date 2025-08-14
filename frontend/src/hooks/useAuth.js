import axios from "axios";
import { useState } from "react";
import { API } from "../api";
const API_URL="http://localhost:3000/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

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
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/events`, {
      headers: { token }
    });
    return res.data;
  };

  const createEvent = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_URL}/createevent`, data, {
      headers: { token }
    });
    return res.data;
  };

  return { signup, signin, getEvents, createEvent, loading };
};
