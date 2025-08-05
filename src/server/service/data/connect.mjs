import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// compute __dirname in ESM-land
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// point dotenv at your project’s config.env
dotenv.config({
  path: join(__dirname, "../../../../config.env"),
});

// sanity check
if (!process.env.ATLAS_URI) {
  console.error(
    "🚨 ATLAS_URI not set. looked here:",
    join(__dirname, "../../../../config.env")
  );
  process.exit(1);
}

export async function connect() {
  const client = new MongoClient(process.env.ATLAS_URI);

  try {
    await client.connect();
    return client;
  } catch (e) {
    console.error(e);
  }
}
