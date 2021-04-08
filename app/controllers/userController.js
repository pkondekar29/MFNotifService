

class UserController {
    constructor() {}
}

UserController.prototype.get = (userId) => {
    return {
        "userId": "afdfa",
        "userName": "Palash",
        "subscrpition": "SMS"
    };
}

UserController.prototype.getAll = () => {
    return [{
        "userId": "afdfa",
        "userName": "Palash",
        "subscrpition": "SMS"
    }];
}

UserController.prototype.create = (user) => {
    return {
        "userId": "afdfa",
        "userName": "Palash",
        "subscrpition": "SMS"
    };
}

UserController.prototype.update = (userId, user) => {
    return {
        "userId": "afdfa",
        "userName": "Palash",
        "subscrpition": "SMS"
    };
}

module.exports = new UserController();