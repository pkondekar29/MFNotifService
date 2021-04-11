const { Kafka } = require('kafkajs')
const notifier = require('../notifier')
const { UserService } = require('../userService');

const kafka = new Kafka({
    brokers: ['localhost:9093', 'localhost:9094']
})
const consumer = kafka.consumer({ groupId: 'orders-alert-consumer-group' })
const userService = new UserService()

async function start() {
    // Connect the Kafka consumer
    await consumer.connect()
    // Subscribe to a topic
    await consumer.subscribe({ topic: 'mf-orders'})
    // Start consumption
    await consumer.run({
        autoCommitInterval: 10,
        eachMessage: async ({ topic, partition, message }) => {
            // Parse the message to JSON
            const orderMessage = JSON.parse(message.value.toString())
            // Get user details from DB
            fetchedUser = await userService.get({userName: orderMessage.userName })
            if(fetchedUser && fetchedUser[0]) {   // If User found
                // Notify the user
                user = fetchedUser[0]
                notifier.sendNotifications(user, orderMessage)
            } else {
                console.log(`User not Found: ${message.userName}`)
            }
        }
    })
}

module.exports = {
    start
};