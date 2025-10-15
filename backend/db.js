// backend/db.js
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // load .env

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("❌ Missing MONGO_URI in .env file");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("Triptrove");
    await db.command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

connectToDatabase();

export { client, db };
