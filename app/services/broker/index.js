const { Kafka } = require('kafkajs')
const notifier = require('../notifier/')
const userService = require('../userService');

const kafka = new Kafka({
    brokers: ['localhost:9093', 'localhost:9094']
})
const consumer = kafka.consumer({ groupId: 'user-group' })

async function consume() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'mf-users', fromBeginning: true })

    await consumer.run({
        autoCommitInterval: 10,
        eachMessage: async ({ topic, partition, message }) => {
            // Get the message
            const orderMessage = JSON.parse(message.value.toString())
            // Get subscription details
            user = await userService.get({userName: orderMessage.userName });
            // Notify the user
            if(user && user[0])
                notifier.notify(user[0], orderMessage)
            else
                console.log(`User not Found: ${message.userName}`)
                
            // console.info({
            //     key: message.key.toString(),
            //     value: orderMessage
            // })
        }
    })
}

startConsuming = () => {
    consume()
}

module.exports = {
    startConsuming
};