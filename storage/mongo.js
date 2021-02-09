
const { MongoClient } = require("mongodb");

const url = `mongodb+srv://Anton:3485@cluster0.3sxmf.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "test";
const collectionName = "todos";

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);

  return await client.db(dbName);
};

const getCollection = async () => {
  const db = await getMongoInstance();

  return await db.collection(collectionName);
};

const listAll = async (idUser) => {
  const collection = await getCollection();
  return collection.find({ idUser }).toArray();
};

const getById = async (id) => {
  const collection = await getCollection();
  return collection.findOne({ id });
};

const create = async (item) => {
  const collection = await getCollection();
  const response = await collection.insertOne(item);
  return response.ops[0];
};

const update = async (item) => {
  const collection = await getCollection();
  const id = item.id;

  const response = await collection.replaceOne({ id }, item);
  return response.ops[0];
};

const remove = async (id) => {
  const collection = await getCollection();
  return collection.deleteOne({ id });
};

module.exports = { listAll, getById, create, update, remove };
