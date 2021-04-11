var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const { dbURI } = require('../config/db-config.json');

/**
 * Service working with persistence of User entity
 */
class UserService {
    constructor() {
    }
}

/**
 * Find user by userID uuid
 * 
 * @param {String} userId 
 */
UserService.prototype.findIyId = async (userId) => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        const query = { _id: ObjectId(userId) };
        return await userCollection.findOne(query);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/**
 * Get use with query paramter.
 *  By default gets all the users
 * 
 * @param {JSON} query 
 */
UserService.prototype.get = async (query = {}) => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        return await userCollection.find(query).toArray();
    } catch(e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

/**
 * Create user 
 * 
 * @param {*} user 
 */
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

/**
 *  Update user for userId. 
 * 
 * @param {string} userId 
 * @param {JSON} user 
 */
UserService.prototype.update = async (userId, user) => {
    const client = await MongoClient.connect(dbURI);
    try {
        const db = client.db("mf");
        const userCollection = db.collection("users");
        const query = { _id: ObjectId(userId) };
        return await userCollection.update(query, {
            $set: user
        });
    } catch(e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

module.exports = new UserService();