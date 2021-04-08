var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

const dbURI = 'mongodb://localhost:27017/';

class UserService {
    constructor() {
    }
}

UserService.prototype.findIyId = async (userId) => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        const query = { "_id": new ObjectId(userId) };
        return await userCollection.findOne(query);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

UserService.prototype.getAll = async () => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        return await userCollection.find({}).toArray();
    } catch(e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

UserService.prototype.create = async (user) => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        insertedUser = await userCollection.insertOne(user);
        return insertedUser["ops"][0];
    } catch(e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

UserService.prototype.update = async (userId, user) => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        const query = { "_id": new ObjectId(userId) };
        return await userCollection.updateOne(query, {
            $set: {
                "subscription": user.subscription,
            }
        });
    } catch(e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

module.exports = new UserService();