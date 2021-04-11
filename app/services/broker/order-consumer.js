const { Kafka } = require('kafkajs')
const notifier = require('../notifier')
const userService = require('../userService');

const kafka = new Kafka({
    brokers: ['localhost:9093', 'localhost:9094']
})
const consumer = kafka.consumer({ groupId: 'orders-alert-consumer-group' })

async function start() {
    // Connect the Kafka consumer
    await consumer.connect()
    // Subscribe to a topic
    await consumer.subscribe({ topic: 'mf-orders'})
    // Start consumption
    await consumer.run({
        autoCommitInterval: 10,
        eachMessage: async ({ topic, partition, message }) => {
            // Get user details from DB
            user = await userService.get({userName: orderMessage.userName })
            if(user && user[0]) {   // If User found
                // Parse the message to JSON
                const orderMessage = JSON.parse(message.value.toString())
                // Notify the user
                notifier.sendNotifications(user[0], orderMessage)
                    .then(_ => console.log(`User: ${user.userName} notified`))
            } else {
                console.log(`User not Found: ${message.userName}`)
            }
        }
    })
}

module.exports = {
    start
};