// app.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Make sure you have this in a .env file at project root:
// MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cis486?retryWrites=true&w=majority
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is undefined. Make sure your .env file exists and is correct.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

await client.connect();

const yourNameAndEmoji = { name: 'barry', emoji: '🐸' };
const carlyNameAndEmoji = { name: 'carly', emoji: '🦖' };

// Middleware
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'exam.html'));
});

// Search endpoint
app.post('/api/get-name', async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) return res.status(400).json({ error: 'missing name' });

    const db = client.db('cis486');
    const collection = db.collection('exam');

    const result = await collection.findOne({ name: userName });
    if (!result) return res.status(404).json({ error: 'Name not found' });

    res.json({ message: 'Name found', name: result.name, emoji: result.emoji });
  } catch (error) {
    console.error('Error retrieving name:', error);
    res.status(500).json({ error: 'Failed to retrieve name' });
  }
});

// Init barry (existing endpoint)
app.get('/api/init-emoji', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('exam');

    const existingEntry = await collection.findOne({ name: yourNameAndEmoji.name });
    if (existingEntry) return res.json({ message: 'Name already exists', data: existingEntry });

    const result = await collection.insertOne(yourNameAndEmoji);
    res.json({ message: 'name & emoji recorded', id: result.insertedId });
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Failed to retrieve emoji' });
  }
});

// Minimal endpoint to insert Carly
app.get('/api/init-carly', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('exam');

    const existingEntry = await collection.findOne({ name: carlyNameAndEmoji.name });
    if (existingEntry) return res.json({ message: 'Carly already exists', data: existingEntry });

    const result = await collection.insertOne(carlyNameAndEmoji);
    res.json({ message: 'Carly added', id: result.insertedId });
  } catch (error) {
    console.error('Error inserting Carly:', error);
    res.status(500).json({ error: 'Failed to insert Carly' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});