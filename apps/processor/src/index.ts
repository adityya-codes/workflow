import prisma from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const producer = kafka.producer();
    await producer.connect();

   try {
    while (1) {
        const pendingRows = await prisma.zapRunOutbox.findMany({
            where: {},
            take: 10
        })
        console.log(pendingRows);

        await producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map((r: any) => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })

        await prisma.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map((x: any) => x.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
} catch (e) {
    console.log(e);
}}

main();