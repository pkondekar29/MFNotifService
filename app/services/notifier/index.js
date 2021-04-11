const mailNotifier = require('./mail-notifier')
const smsNotifier = require('./sms-notifier')

getNotifier = (subscriptionType) => {
    if(subscriptionType === 'email') {
        return mailNotifier;
    } else if(subscriptionType === 'sms') {
        return smsNotifier;
    }
}

sendNotifications = async (user, message) => {
    // Get user subscriptions
    const subscriptions = user.subscription;
    // If user has subscribed
    if(subscriptions)
        subscriptions
            .filter(subscription => subscription.enabled)       // Filter the subscriptions which are enabled/subscribed
            .map(subscription => getNotifier(subscription.type))    // Get notifier for the subscription type
            .map(notifier => {      // Send the notification
                try {
                    notifier.notify(user, message)
                } catch(e) {
                    console.log(`Could not notiy user: ${user.userName} by ${notifier.constructor.name}`)
                    // throw e
                }
            })
    else
        console.log(`User: [${user._id}, ${user.userName}] has not subscribed to any services`)
}

module.exports = {
    sendNotifications
}