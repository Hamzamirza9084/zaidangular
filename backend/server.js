const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/careercompass')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// --- User Schema ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Job Seeker' }, 
  status: { type: String, default: 'Active' },
  lastActive: { type: Date, default: Date.now },
  avatarUrl: { type: String, default: 'https://i.pravatar.cc/150' } 
});

const User = mongoose.model('User', UserSchema);

// --- Routes ---

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ 
      name, 
      email, 
      password,
      role: role || 'Job Seeker'
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      user.lastActive = new Date();
      await user.save();
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    res.status(200).json({ message: 'Admin login successful', role: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// --- FIX: The Route You Were Missing ---
app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// --- SEED ROUTE: Run this once to get the data you want ---
app.get('/seed', async (req, res) => {
  const sampleUsers = [
    {
      name: 'Alex Morgan',
      email: 'alex.morgan@career.ai',
      password: 'password123',
      role: 'Administrator',
      status: 'Active',
      lastActive: new Date(),
      avatarUrl: 'https://i.pravatar.cc/150?u=1'
    },
    {
      name: 'Sarah Chen',
      email: 'sarah.chen@career.ai',
      password: 'password123',
      role: 'Career Coach',
      status: 'Active',
      lastActive: new Date(Date.now() - 3600000), 
      avatarUrl: 'https://i.pravatar.cc/150?u=2'
    },
    {
      name: 'Michael Foster',
      email: 'mike.foster@example.com',
      password: 'password123',
      role: 'Job Seeker',
      status: 'Pending',
      lastActive: new Date(Date.now() - 86400000), 
      avatarUrl: 'https://i.pravatar.cc/150?u=3'
    },
    {
      name: 'David Kim',
      email: 'david.k@career.ai',
      password: 'password123',
      role: 'Administrator',
      status: 'Active',
      lastActive: new Date(),
      avatarUrl: 'https://i.pravatar.cc/150?u=5'
    }
  ];

  try {
    // await User.deleteMany({}); // Uncomment if you want to wipe old data first
    await User.insertMany(sampleUsers);
    res.send('Database populated with sample users!');
  } catch (error) {
    res.status(500).send('Error seeding database: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});