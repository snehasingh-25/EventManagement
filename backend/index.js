const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const {z} =require('zod');
const app = express();
const { UserModel, EventsModel } = require('./db');
const path=require('path');
const cors=require('cors');
const authMiddleware = require('./authMiddleware');
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


app.post('/api/signup', async (req, res) => {
    const requiredBody=z.object({
        email:z.string().email({ message: "Please enter a valid email" }),
        password:z.string(),
        name:z.string()
    })

    const parsedData=requiredBody.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message:"Incorrect format",
            error:parsedData.error
        })
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const hashedpassword = await bcrypt.hash(password, 5)
        await UserModel.create({ name, email, password: hashedpassword });
        res.status(201).json({
            message: "Signed up successfully, please login"
        })
    }
    catch (err) {
        return res.status(409).json({ message: "Email already registered" });
    } 
})

app.post('/api/signin', async (req, res) => {
    const {email, password } = req.body;

    const user = await UserModel.findOne({
        email,
    });
    if (!user)
        return res.status(403).json({
            message: "User do not exist"
        })
    const hashedpassword = await bcrypt.compare(password, user.password);

    if (!hashedpassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });

})

app.get('/api/events', async (req, res) => {
    try {
        const events = await EventsModel.find().populate('userId', '_id name email');
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error fetching events" });
    }
});

app.use(authMiddleware);

app.get('/api/profile', async (req, res) => {
    const user = await UserModel.findById(req.userId);
    const events = await EventsModel.find({ userId: req.userId });
    res.json({
        _id: user._id,
        username: user.name,
        email: user.email,
        events
    });
});


app.post('/api/createevent', async (req, res) => {
    const { title, description, image, date, time, venue } = req.body;
    await EventsModel.create({
        title,
        description,
        image,
        date,
        time,
        venue,
        userId: req.userId
    })
    res.status(201).json({
        message: description
    })
})



app.post('/api/events/:id/register', async (req, res) => {
  try {
    const event = await EventsModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if already registered
    if (event.registeredUsers.includes(req.userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Add user to registered list
    event.registeredUsers.push(req.userId);
    await event.save();

    res.json({ message: "Registered successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await EventsModel.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const event = await EventsModel.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.userId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }
  await event.deleteOne();
  res.json({ message: "Event deleted" });
});

app.post('/api/events/:id/register', async (req, res) => {
  const event = await EventsModel.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.userId.toString() === req.userId) {
    return res.status(400).json({ message: "You cannot register for your own event" });
  }
  // Save registration info here (depends on your schema)
  res.json({ message: "Registered successfully" });
});

app.listen(process.env.PORT || 3000);