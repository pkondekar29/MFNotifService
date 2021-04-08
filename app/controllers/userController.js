const userService = require("../services/userService");

class UserController {
    constructor() {}
}

UserController.prototype.findIyId = async (userId) => {
    try {
        return await userService.findIyId(userId);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

UserController.prototype.getAll = async () => {
    try {
        return await userService.getAll();
    } catch(e) {
        console.log(e);
        throw e;
    }
}

UserController.prototype.create = async (user) => {
    try {
        return await userService.create(user);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

UserController.prototype.update = async (userId, user) => {
    try {
        await userService.update(userId, user);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

module.exports = new UserController();