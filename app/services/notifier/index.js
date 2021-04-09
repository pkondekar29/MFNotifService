const mailNotifier = require('./mail-notifier');
const smsNotifier = require('./sms-notifier');

getNotifier = (subscriptionType) => {
    if(subscriptionType === 'email') {
        return mailNotifier;
    } else if(subscriptionType === 'sms') {
        return smsNotifier;
    }
    return null;
}

notify = async (user, message) => {
    const subscriptions = user.subscription;
    mailNotifier.notify(user, message)
}

module.exports = {
    notify
}