const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken)

class SMSNotifier {
    constructor(){}
}

SMSNotifier.prototype.notify = async (user, message) => {
    client.messages
        .create({
            body: getSMSMessage(message),
            from: '+14156495603',
            to: user.mobileNumber
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err));
}

getSMSMessage = (message) => {
    return `Your Order of ${message.quantity} ${message.productName}s is ${message.orderStatus}. [Order ID: ${message.orderId}]`;
}

module.exports = new SMSNotifier();