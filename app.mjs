//app.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import 'dotenv/config';



const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const uri = process.env.MONGO_URI;

/*
👇🏻 no mods needed, this starts on 3000 unless (like for render) your PaaS assigns you a port. It's a little cleaner.
*/ 
const PORT = process.env.PORT || 3000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//i add this:
await client.connect()


const yourNameAndEmoji = { name: 'barry', emoji: '🐸' }; //don't use my frog. 
const yourNameAndEmoji = { name: 'carly', emoji: '🦖' };


//app instantiations
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'exam.html'));
})

app.post('/api/get-name', async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: 'missing name' });
    }

    const db = client.db('cis486');
    const collection = db.collection('exam');

    const result = await collection.findOne({ name: userName });

    if (!result) {
      return res.status(404).json({ error: 'Name not found' });
    }

    res.json({ 
      message: 'Name found', 
      name: result.name,
      emoji: result.emoji 
    });
  }
  catch (error) {
    console.error('Error retrieving name:', error);
    res.status(500).json({ error: 'Failed to retrieve name' });
  }

})

/* 
👇🏻no modifications needed for this endpoint, but you do have to figure out where, when, & how to call it at least once!
*/
app.get('/api/init-emoji', async (req, res) => {
  try {
    
    const db = client.db('cis486');
    const collection = db.collection('exam');
    
    // Check if name already exists
    const existingEntry = await collection.findOne({ name: yourNameAndEmoji.name });
    
    if (existingEntry) {
      return res.json({ 
        message: 'Name already exists', 
        data: existingEntry 
      });
    }
    
    // Only insert if name doesn't exist
    const result = await collection.insertOne(yourNameAndEmoji);
    res.json({ message: 'name & emoji recorded', id: result.insertedId });
  }
  catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Failed to retrieve emoji' });
  }
})



/*
👇🏻notice the refactored app.listen:
no code mods needed but this uses the PORT variable for PaaS deployments
*/ 
//start the server. 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})