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
    if(subscriptions)
        subscriptions
            .filter(subscription => subscription.enabled)
            .map(subscription => getNotifier(subscription.type))
            .filter(o => o !== null)
            .forEach(notifier => notifier.notify(user, message))
    else
        console.log(`User: [${user._id}, ${user.userName}] has not subscribed to any services`)
}

module.exports = {
    notify
}