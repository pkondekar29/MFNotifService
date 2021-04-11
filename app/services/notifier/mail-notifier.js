const nodemailer = require('nodemailer');
const mailConfig = require('../../config/mail-config.json');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailConfig.from,
        pass: mailConfig.pass
    }
});

/**
 * Sends Email notification
 */
class EmailNotifier {
    constructor() {}
}

/**
 * Notify the user by sending an email
 * 
 * @param {JSON} user 
 * @param {JSON} message 
 */
EmailNotifier.prototype.notify = async (user, message) => {
    var mailOptions = {
        from: 'pkondekar29@gmail.com',
        to: user.emailId,
        subject: getMailSubject(message),
        text: getMailBody(user, message)
    };
    
    try {
        return await transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else console.log(`Email sent for order: ${message.orderId} to ${user.emailId}. Response: ${info.response}`);
        });
    } catch(e) {
        console.log(`Error while sending email for user: ${user.userName}`)
        throw e
    }
}

/**
 * Get Email Subject
 */
getMailSubject = (message) => {
    return `Your Order of ${message.productName} is ${message.orderStatus}. [Order ID: ${message.orderId}]`;
}

/**
 * Get Email Body
 */
getMailBody = (user, message) => {
    return `
        Hello ${user.name},

        We are pleased to inform you on your order of ${message.quantity} ${message.productName}s is ${message.orderStatus}.

        Please get back to us on servicemail@marketfront.in in case of any queries.

        Regards,
        MarketFront Team
    `;
}

module.exports = {
    EmailNotifier
}
