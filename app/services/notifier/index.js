const {EmailNotifier} = require('./mail-notifier')
const {SMSNotifier} = require('./sms-notifier')

getNotifier = (subscriptionType) => {
    if(subscriptionType === 'email') {
        return new EmailNotifier();
    } else if(subscriptionType === 'sms') {
        return new SMSNotifier();
    }
}

sendNotifications = async (user, message) => {
    // Get user subscriptions
    const subscriptions = user.subscription;
    // If user has subscribed
    if(subscriptions)
        subscriptions
            .filter(subscription => subscription.enabled)       // Filter the subscriptions which are enabled/subscribed
            .map(subscription => {
                // Get notifier for the subscription type
                let notifier = getNotifier(subscription.type)    
                 // Send the notification
                try {
                    notifier.notify(user, message)
                } catch(e) {
                    console.log(`Could not notiy user: ${user.userName} by ${notifier.constructor.name}.`, e)
                }
            })
    else
        console.log(`User: [${user._id}, ${user.userName}] has not subscribed to any services`)
}

module.exports = {
    sendNotifications
}