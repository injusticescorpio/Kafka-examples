//consumer code
import Kafka from 'node-rdkafka'
import eventType from '../eventType.js';

const consumer =Kafka.KafkaConsumer({
    'group.id':'kafka',
    'metadata.broker.list': 'localhost:9092', // Replace with your broker server details
})

consumer.connect()


consumer.on('ready',()=>{
    console.log('consumer connected..')
    consumer.subscribe(['test'])
    consumer.consume()
}).on('data',(data)=>{
    console.log('received data==>',eventType.fromBuffer(data.value))

})

