import { CompressionTypes, Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'message-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'message-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat}) => {
            console.log("📩 Consumer got message:", {
                topic,
                partition,
                key: message.key?.toString(),
                value: message.value ? message.value.toString() : null,
                timestamp: message.timestamp,
                attributes: message.attributes
            });

            await heartbeat();
        }
    });

    await producer.connect();
    await producer.send({
        topic: 'message-topic',
        acks: 1,
        timeout: 10000,
        compression: CompressionTypes.GZIP,
        messages: [
            {
                key: 'user123',
                value: 'Hello, Kafka!',
                timestamp: Date.now().toString(),
                headers: { source: 'my-service' }
            },
            {
                key: 'user456',
                value: Buffer.from('Binary message'),
                headers: { encoding: 'binary' }
            }
        ]
    });
    await producer.disconnect();
};

run().catch(console.error);
