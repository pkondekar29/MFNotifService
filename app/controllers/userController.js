const {UserService} = require("../services/userService");

/**
 *  Controller to handle User entity CRUD
 */
class UserController {
    constructor() {}
}

/**
 * Find user by UserID
 * 
 * @param {String} userId 
 */
UserController.prototype.findIyId = async (userId) => {
    if(!userId) {
        throw new TypeError("UserId is incorrect")
    }
    try {
        return await new UserService().findIyId(userId);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

/**
 * Get all users
 */
UserController.prototype.getAll = async () => {
    try {
        return await new UserService().get();
    } catch(e) {
        console.log(e);
        throw e;
    }
}

/**
 * Create new user
 * 
 * @param {JSON} user 
 */
UserController.prototype.create = async (user) => {
    if(!user) {
        throw new TypeError(`User: ${user} is invalid`)
    }
    try {
        return await new UserService().create(user);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

/**
 * Update user with userId
 * 
 * @param {String} userId 
 * @param {JSON} user 
 */
UserController.prototype.update = async (userId, user) => {
    if(!user || !userId) {
        throw new TypeError(`UserId: ${userId} or User: ${user} is invalid`)
    }
    try {
        await new UserService().update(userId, user);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

module.exports = {
    UserController
}