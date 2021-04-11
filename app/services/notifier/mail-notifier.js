const nodemailer = require('nodemailer');
const mailConfig = require('../../config/mail-config.json');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailConfig.from,
        pass: mailConfig.pass
    }
});

class EmailNotifier {
    constructor() {}
}

EmailNotifier.prototype.notify = async (user, message) => {
    var mailOptions = {
        from: 'pkondekar29@gmail.com',
        to: user.emailId,
        subject: getMailSubject(message),
        text: getMailBody(user, message)
    };
    
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else console.log(`Email sent for order: ${message.orderId}. Response: ${info.response}`);
        });
    } catch(e) {
        console.log(`Error while sending email for user: ${user.userName}`)
        throw e
    }
}

getMailSubject = (message) => {
    return `Your Order of ${message.productName} is ${message.orderStatus}. [Order ID: ${message.orderId}]`;
}

getMailBody = (user, message) => {
    return `
        Hello ${user.name},

        We are pleased to inform you on your order of ${message.quantity} ${message.productName}s is ${message.orderStatus}.

        Please get back to us on servicemail@marketfront.in in case of any queries.

        Regards,
        MarketFront Team
    `;
}

module.exports = new EmailNotifier()
