const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromMobileNumber = '+14156495603'
const client = require('twilio')()

class SMSNotifier {
    constructor(){}
}

SMSNotifier.prototype.notify = async (user, message) => {
    client.messages
        .create({
            body: getSMSMessage(message),
            from: fromMobileNumber,
            to: user.mobileNumber
        })
        .then(message => console.log(`SMS sent for user: ${user.userName}. MessageID: ${message.sid}`))
        .catch(err => {
            console.log(err)
            throw err;
        });
}

getSMSMessage = (message) => {
    return `Your Order of ${message.quantity} ${message.productName}s is ${message.orderStatus}. [Order ID: ${message.orderId}]`;
}

module.exports = new SMSNotifier();