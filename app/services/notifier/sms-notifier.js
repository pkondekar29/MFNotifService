const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromMobileNumber = '+14156495603'
const client = require('twilio')()

/**
 * SMS Notifier
 */
class SMSNotifier {
    constructor(){}
}

/**
 * Notify user with the message by sending SMS
 * 
 * @param {JSON} user 
 * @param {JSON} message 
 */
SMSNotifier.prototype.notify = async (user, message) => {
    await client.messages
        .create({
            body: getSMSMessage(message),
            from: fromMobileNumber,
            to: user.mobileNumber
        })
        .then(message => console.log(`SMS sent to user: ${user.userName} on ${user.mobileNumber}. MessageID: ${message.sid}`))
        .catch(err => {
            console.log(err)
            throw err
        })
}

getSMSMessage = (message) => {
    return `Your Order of ${message.quantity} ${message.productName}s is ${message.orderStatus}. [Order ID: ${message.orderId}]`;
}

module.exports = {
    SMSNotifier
}