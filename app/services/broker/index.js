const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    brokers: ['localhost:9093', 'localhost:9094']
})
const consumer = kafka.consumer({ groupId: 'user-group' })

async function consume() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'mf-users', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
                topic: topic,
                partition: partition
            })
        },
    })
}

startConsuming = () => {
    consume()
}

module.exports = {
    startConsuming
};