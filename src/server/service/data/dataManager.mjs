import { connect } from "./connect.mjs";

export const read = async (collectionName) => {
  console.log("collectionName", collectionName);
  const client = await connect();
  console.log("client", client);
  const db = client.db("YMDB");
  console.log("db", db);
  const collection = db.collection(collectionName);
  console.log("collection", collection);
  const docs = await collection.find({}).toArray();
  console.log("Documents:", docs);
  await client.close();
  return docs;
};

export const set = async (collectionName, doc) => {
  const client = await connect();
  const db = client.db("YMDB");
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(doc);
  console.log(`Inserted with _id: ${result.insertedId}`);
  await client.close();
  return result;
};

export const update = async (collectionName, filter, updates) => {
  const client = await connect();
  const db = client.db("YMDB");
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(filter, { $set: updates });
  console.log(
    `Took ${result.matchedCount} documet` +
      `Modified To ${result.modifiedCount} document`
  );
  await client.close();
  return result;
};

read("User-Data");
